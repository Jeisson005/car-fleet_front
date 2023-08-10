import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private empleadosURL: string = `${environment.apiBaseUrl}/empleados`;
  private carrosURL: string = `${environment.apiBaseUrl}/carros`;
  private viajesURL: string = `${environment.apiBaseUrl}/viajes`;

  constructor(private http: HttpClient) { }

  createEmpleado(empleado: any): Observable<any> {
    return this.http.post(this.empleadosURL, empleado);
  }

  updateEmpleado(empleado: any): Observable<any> {
    return this.http.put(this.empleadosURL, empleado);
  }

  deleteEmpleado(id: number): Observable<any> {
    const url = `${this.empleadosURL}/${id}`;
    return this.http.delete(url);
  }

  getEmpleados(): Observable<any[]> {
    return this.http.get<any[]>(this.empleadosURL);
  }

  createCarro(carro: any): Observable<any> {
    return this.http.post(this.carrosURL, carro);
  }

  updateCarro(carro: any): Observable<any> {
    return this.http.put(this.carrosURL, carro);
  }

  deleteCarro(id: number): Observable<any> {
    const url = `${this.carrosURL}/${id}`;
    return this.http.delete(url);
  }

  getCarros(): Observable<any[]> {
    return this.http.get<any[]>(this.carrosURL);
  }

  getCarrosRetirados(): Observable<any[]> {
    const url = `${this.carrosURL}/retirados`;
    return this.http.get<any[]>(url);
  }

  retirarCarro(idEmpleado: number, idCarro: number): Observable<any> {
    const url = `${this.viajesURL}/${idEmpleado}/${idCarro}`;
    return this.http.post(url, null);
  }

  devolverCarro(idEmpleado: number, idCarro: number): Observable<any> {
    const url = `${this.viajesURL}/${idEmpleado}/${idCarro}`;
    return this.http.delete(url);
  }

  getViajes(): Observable<any[]> {
    return this.http.get<any[]>(this.viajesURL);
  }

  getViajesRealizados(mes: number, ano: number): Observable<any[]> {
    const url = `${this.viajesURL}/realizados/${mes}/${ano}`;
    return this.http.get<any[]>(url);
  }

}
