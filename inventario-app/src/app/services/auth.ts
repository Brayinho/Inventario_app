import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:4000/api/auth';

  private _usuario = signal<any>(null); // señal reactiva

  // Computed para obtener valor reactivo tipo getter
  usuario = computed(() => this._usuario());

  constructor(private http: HttpClient) {
    if (typeof localStorage !== 'undefined') {
      const usuarioGuardado = localStorage.getItem('usuario');
      if (usuarioGuardado) {
        this._usuario.set(JSON.parse(usuarioGuardado));
      }
    }
  }

  login(data: any): Observable<any> {
    return new Observable((observer) => {
      this.http.post(`${this.baseUrl}/login`, data).subscribe({
        next: (usuario: any) => {
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('usuario', JSON.stringify(usuario));
          }
          this._usuario.set(usuario);
          observer.next(usuario);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  cerrarSesion() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('usuario');
    }
    this._usuario.set(null);
  }

  // Método público para saber si hay sesión activa
  estaAutenticado(): boolean {
    return this._usuario() !== null;
  }
}
