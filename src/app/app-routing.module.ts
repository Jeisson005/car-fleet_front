import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { CarrosComponent } from './carros/carros.component';
import { ViajesComponent } from './viajes/viajes.component';
import { ViajesRealizadosComponent } from './viajes-realizados/viajes-realizados.component';
import { AuthGuard } from './security/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'empleados', component: EmpleadosComponent, canActivate: [AuthGuard] },
  { path: 'carros', component: CarrosComponent, canActivate: [AuthGuard] },
  { path: 'viajes', component: ViajesComponent, canActivate: [AuthGuard] },
  { path: '', component: ViajesComponent, canActivate: [AuthGuard] },
  { path: 'viajes-realizados', component: ViajesRealizadosComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), 
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
