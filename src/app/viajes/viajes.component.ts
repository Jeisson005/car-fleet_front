import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';
import { Column, Option } from '../tabla/tabla.component';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})
export class ViajesComponent {
  form!: FormGroup;
  columns: Column[];
  options: Option[];

  empleados: any[];
  carros: any[];
  viajes: any[];

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.empleados = [];
    this.carros = [];
    this.viajes = [];
    
    this.columns = [
      { id: 'id', name: 'ID' },
      { id: 'empleado', name: 'Empleado' },
      { id: 'carro', name: 'Carro' },
      { id: 'fechaRetirada', name: 'Fecha recogida' },
      { id: 'fechaEntrega', name: 'Fecha entrega' },
    ];
    this.options = [
      { icon: 'bi-arrow-bar-left', btn: 'btn-warning', name: 'Devolver' }
    ];
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      empleado: ['', Validators.required],
      carro: ['', Validators.required]
    });
    this.apiService.getEmpleados().subscribe({ next: (result: any) => { this.empleados = result; } });
    this.apiService.getCarros().subscribe({ next: (result: any) => { this.carros = result; } });
    Swal.fire({ title: 'Cargando...', allowOutsideClick: false, didOpen: () => { Swal.showLoading() } });
    this.apiService.getViajes()
      .subscribe({
        next: (result: any) => {
          this.viajes = result;
          Swal.close();
        },
        error: (error: any) => {
          Swal.close();
          Swal.fire({ title: 'Error', icon: 'error', text: error?.error?.message });
        }
      }
      );
  }

  onOptionClick(event: { optionName: string, element: any }): void {
    const { optionName, element } = event;
    this.devolver(element);
  }

  isInvalidControl(controlName: string): boolean {
    const control = this.form.get(controlName);
    return control !== null && control.invalid && (control.dirty || control.touched);
  }

  get mapViajes() {
    return this.viajes.map((item: { id: any; empleado: { id: any; nombre: any; }; carro: { id: any; marca: any; modelo: any; }; fechaRetirada: any; fechaEntrega: any; }) => ({
      id: item.id,
      empleado: `${item.empleado.id} - ${item.empleado.nombre}`,
      carro: `${item.carro.id} - ${item.carro.marca} - ${item.carro.modelo}`,
      fechaRetirada: item.fechaRetirada,
      fechaEntrega: item.fechaEntrega
    }));
  }

  guardar() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      Swal.fire({ title: 'Cargando...', allowOutsideClick: false, didOpen: () => { Swal.showLoading() } });
      console.log(this.form.value);
      console.log(this.form.value.empleado);
      console.log(this.form.value.carro);
      this.apiService.retirarCarro(this.form.value.empleado, this.form.value.carro)
        .subscribe({
          next: (result) => {
            this.viajes.push(result);
            Swal.close();
            Swal.fire({ title: 'Guardado', icon: 'success', showConfirmButton: false, timer: 1500 });
          },
          error: (error) => {
            Swal.close();
            Swal.fire({ title: 'Error', icon: 'error', text: error?.error?.message });
          },
          complete: () => {
            this.form.reset();
          }
        }
        );
    }
  }

  devolver(element: any) {
    Swal.fire({ title: 'Cargando...', allowOutsideClick: false, didOpen: () => { Swal.showLoading() } });
    const index = this.viajes.findIndex(e => e.id === element.id);
    const viaje = this.viajes[index];
    this.apiService.devolverCarro(viaje.empleado.id, viaje.carro.id)
      .subscribe({
        next: (result) => {
          this.viajes[index] = result;
          Swal.close();
          Swal.fire({ title: 'Guardado', icon: 'success', showConfirmButton: false, timer: 1500 });
        },
        error: (error) => {
          Swal.close();
          Swal.fire({ title: 'Error', icon: 'error', text: error?.error?.message });
        }
      }
      );
  }

}
