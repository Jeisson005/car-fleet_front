import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Column, Option } from '../tabla/tabla.component';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-carros-uso',
  templateUrl: './carros-uso.component.html',
  styleUrls: ['./carros-uso.component.css']
})
export class CarrosUsoComponent {
  @ViewChild('content') content!: any;
  columns: Column[];

  carros: any[];

  constructor(private modalService: NgbModal, private apiService: ApiService) {
    this.carros = [];
    this.columns = [
      { id: 'id', name: 'ID' },
      { id: 'modelo', name: 'Modelo' },
      { id: 'marca', name: 'Marca' },
      { id: 'fechaFabricacion', name: 'Fecha fabricación', pipe: 'dd/MM/yyyy'  },
    ];
  }

	open() {
    Swal.fire({ title: 'Cargando...', allowOutsideClick: false, didOpen: () => { Swal.showLoading() } });
    this.apiService.getCarrosRetirados()
      .subscribe({
        next: (result: any) => {
          this.carros = result;
          Swal.close();
        },
        error: (error: any) => {
          Swal.close();
          Swal.fire({ title: 'Error', icon: 'error', text: error?.error?.message });
        }
      }
      );
		this.modalService.open(this.content, { ariaLabelledBy: 'modal-carros' });
	}

  get mapCarros() {
    return this.carros.map((carro) => { carro.fechaFabricacion = new Date(carro.fechaFabricacion); return carro;});
  }

}
