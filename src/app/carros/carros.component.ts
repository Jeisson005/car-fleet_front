import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Column, Option } from '../tabla/tabla.component';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrls: ['./carros.component.css']
})
export class CarrosComponent {
  form!: FormGroup;
  columns: Column[];
  options: Option[];

  carros: any[];

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.carros = [];
    this.columns = [
      { id: 'id', name: 'ID' },
      { id: 'modelo', name: 'Modelo' },
      { id: 'marca', name: 'Marca' },
      { id: 'fechaFabricacion', name: 'Fecha fabricación', pipe: 'dd/MM/yyyy' },
    ];
    this.options = [
      { icon: 'bi-pencil-fill', btn: 'btn-secondary', name: 'Editar' },
      { icon: 'bi-trash3-fill', btn: 'btn-danger', name: 'Eliminar' },
    ];
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      fechaFabricacion: [null, Validators.required],
    });
    Swal.fire({ title: 'Cargando...', allowOutsideClick: false, didOpen: () => { Swal.showLoading() } });
    this.apiService.getCarros()
      .subscribe({
        next: (result) => {
          this.carros = result;
          Swal.close();
        },
        error: (error) => {
          Swal.close();
          Swal.fire({ title: 'Error', icon: 'error', text: error?.error?.message });
        }
      }
      );
  }

  get mapCarros() {
    return this.carros.map((carro) => { carro.fechaFabricacion = new Date(carro.fechaFabricacion); return carro;});
  }

  onOptionClick(event: { optionName: string, element: any }): void {
    const { optionName, element } = event;
    switch (optionName) {
      case 'Editar':
        const value = { ...element };
        const fecha = new Date(value.fechaFabricacion);
        value.fechaFabricacion = new NgbDate(fecha.getFullYear(), fecha.getMonth() + 1, fecha.getDate());
        this.form.setValue(value);
        break;
      case 'Eliminar':
        this.eliminar(element);
        break;
    }
  }

  isInvalidControl(controlName: string): boolean {
    const control = this.form.get(controlName);
    return control !== null && control.invalid && (control.dirty || control.touched);
  }

  guardar() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const value = { ...this.form.value };
      value.fechaFabricacion = new Date(value.fechaFabricacion.year, value.fechaFabricacion.month - 1, value.fechaFabricacion.day);
      Swal.fire({ title: 'Cargando...', allowOutsideClick: false, didOpen: () => { Swal.showLoading() } });
      if (!value.id) { // Create
        this.apiService.createCarro(value)
          .subscribe({
            next: (result) => {
              this.carros.push(result);
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
      } else { // Update
        this.apiService.updateCarro(value)
          .subscribe({
            next: (result) => {
              const index = this.carros.findIndex(e => e.id === result.id);
              this.carros[index] = result;
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
  }

  eliminar(carro: any) { // Delete
    Swal.fire({ title: 'Cargando...', allowOutsideClick: false, didOpen: () => { Swal.showLoading() } });
    this.apiService.deleteCarro(carro.id)
      .subscribe({
        next: () => {
          const index = this.carros.findIndex(e => e.id === carro.id);
          this.carros.splice(index, 1);
          Swal.close();
          Swal.fire({ title: 'Eliminado', icon: 'success', showConfirmButton: false, timer: 1500 });
        },
        error: (error) => {
          Swal.close();
          Swal.fire({ title: 'Error', icon: 'error', text: error?.error?.message });
        }
      }
      );
  }

}
