import { Component, ViewChild } from '@angular/core';
import { CarrosUsoComponent } from '../carros-uso/carros-uso.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  @ViewChild('carrosUso') modal!: CarrosUsoComponent;
  public isMenuCollapsed = false;

  carrosEnUso() {
    if (this.modal) {
      this.modal.open();
    }
  }
}
