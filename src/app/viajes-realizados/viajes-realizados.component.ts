import { Component } from '@angular/core';
import { Column, Option } from '../tabla/tabla.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-viajes-realizados',
  templateUrl: './viajes-realizados.component.html',
  styleUrls: ['./viajes-realizados.component.css']
})
export class ViajesRealizadosComponent {
  form!: FormGroup;
  columns: Column[];

  viajes: any[];

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.viajes = [];
    this.columns = [
      { id: 'id', name: 'ID' },
      { id: 'empleado', name: 'Empleado' },
      { id: 'carro', name: 'Carro' },
      { id: 'fechaRetirada', name: 'Fecha recogida' },
      { id: 'fechaEntrega', name: 'Fecha entrega' },
    ];
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      mes: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      ano: ['', [Validators.required, Validators.min(2000), Validators.max(3000)]],
    });
  }

  isInvalidControl(controlName: string): boolean {
    const control = this.form.get(controlName);
    return control !== null && control.invalid && (control.dirty || control.touched);
  }

  buscar() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      Swal.fire({ title: 'Cargando...', allowOutsideClick: false, didOpen: () => { Swal.showLoading() } });
      this.apiService.getViajesRealizados(this.form.value.mes, this.form.value.ano)
        .subscribe({
          next: (result: any) => {
            this.viajes = result.map((item: { id: any; empleado: { id: any; nombre: any; }; carro: { id: any; marca: any; modelo: any; }; fechaRetirada: any; fechaEntrega: any; }) => ({
              id: item.id,
              empleado: `${item.empleado.id} - ${item.empleado.nombre}`,
              carro: `${item.carro.id} - ${item.carro.marca} - ${item.carro.modelo}`,
              fechaRetirada: item.fechaRetirada,
              fechaEntrega: item.fechaEntrega
            }));
            Swal.close();
          },
          error: (error: any) => {
            Swal.close();
            Swal.fire({ title: 'Error', icon: 'error', text: error?.error?.message });
          }
        }
        );
    }
  }
}
