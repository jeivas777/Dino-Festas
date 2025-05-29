import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseEndpoint = 'https://dino-festas.onrender.com/admin/login';

  constructor(private http: HttpClient) {}

  login(usuario: string, senha: string) {
    const body = { username: usuario, password: senha };
    return this.http.post<{ token: string }>(this.baseEndpoint, body);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getAuthHeaders() {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }
}
