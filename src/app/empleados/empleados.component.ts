import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Column, Option } from '../tabla/tabla.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent {
  form!: FormGroup;
  columns: Column[];
  options: Option[];

  empleados: any[];

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.empleados = [];
    this.columns = [
      { id: 'id', name: 'ID' },
      { id: 'nombre', name: 'Nombre' },
    ];
    this.options = [
      { icon: 'bi-pencil-fill', btn: 'btn-secondary', name: 'Editar' },
      { icon: 'bi-trash3-fill', btn: 'btn-danger', name: 'Eliminar' },
    ];
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      matricula: ['', Validators.required]
    });
    Swal.fire({ title: 'Cargando...', allowOutsideClick: false, didOpen: () => { Swal.showLoading() } });
    this.apiService.getEmpleados()
      .subscribe({
        next: (result) => {
          this.empleados = result;
          Swal.close();
        },
        error: (error) => {
          Swal.close();
          Swal.fire({ title: 'Error', icon: 'error', text: error?.error?.message });
        }
      }
      );
  }

  onOptionClick(event: { optionName: string, element: any }): void {
    const { optionName, element } = event;
    switch (optionName) {
      case 'Editar':
        this.form.setValue(element);
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
      Swal.fire({ title: 'Cargando...', allowOutsideClick: false, didOpen: () => { Swal.showLoading() } });
      if (!this.form.value.id) { // Create
        this.apiService.createEmpleado(this.form.value)
          .subscribe({
            next: (result) => {
              this.empleados.push(result);
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
        this.apiService.updateEmpleado(this.form.value)
          .subscribe({
            next: (result) => {
              const index = this.empleados.findIndex(e => e.id === result.id);
              this.empleados[index] = result;
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

  eliminar(empleado: any) { // Delete
    Swal.fire({ title: 'Cargando...', allowOutsideClick: false, didOpen: () => { Swal.showLoading() } });
    this.apiService.deleteEmpleado(empleado.id)
      .subscribe({
        next: () => {
          const index = this.empleados.findIndex(e => e.id === empleado.id);
          this.empleados.splice(index, 1);
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
