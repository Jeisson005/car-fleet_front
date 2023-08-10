import { Component, ViewChild } from '@angular/core';
import { CarrosUsoComponent } from '../carros-uso/carros-uso.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  @ViewChild('carrosUso') modal!: CarrosUsoComponent;
  public isMenuCollapsed: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.isMenuCollapsed = false;
  }

  carrosEnUso() {
    if (this.modal) {
      this.modal.open();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
