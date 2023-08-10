import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl: string;

  constructor(private http: HttpClient) {
    this.authUrl = `${environment.apiBaseUrl}/auth`;
  }

  renew() {
    if (this.getToken())
      this.http.post<any>(this.authUrl, {})
        .subscribe({
          next: (result) => {
            localStorage.setItem('token', result.token);
          },
          error: () => { this.logout(); }
        }
        );
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.authUrl, { username, password });
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

}
