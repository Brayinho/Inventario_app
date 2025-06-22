import { Component } from '@angular/core';
import { AuthService } from '../../services/auth'
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  imports: [FormsModule, CommonModule, RouterModule]
})
export class RegisterComponent {
  nombre = '';
  correo = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  registrarUsuario() {
    const datos = { nombre: this.nombre, correo: this.correo, password: this.password};
    this.authService.register(datos).subscribe({
      next: () => {
        alert('Registrado con éxito');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Error al registrar');
        console.error(err);
      }
    });
  }
}
