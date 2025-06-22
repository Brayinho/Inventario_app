import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // 👈 Importar *ngIf
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  template: `
    <nav *ngIf="usuario()">
      <a routerLink="/agregar-producto">Agregar Producto</a> |
      <a routerLink="/registrar-movimiento">Registrar Movimiento</a> |
      <a routerLink="/informe-producto">Informe Producto</a> |
      <a routerLink="/listar-productos">Listar Productos</a> |
      <button (click)="cerrarSesion()">Cerrar sesión</button>
    </nav>

    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  usuario = computed(() => this.authService.usuario());

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
