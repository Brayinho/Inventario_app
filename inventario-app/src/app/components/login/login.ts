import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule]
})
export class LoginComponent implements OnInit {
  correo = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // ✅ Si ya hay sesión iniciada, redirige a la app
    const usuario = this.authService.usuario();
    if (usuario) {
      this.router.navigate(['/agregar-producto']);
    }
  }

  iniciarSesion() {
    this.authService.login({ correo: this.correo, password: this.password }).subscribe({
      next: (usuario) => {
        this.router.navigate(['/agregar-producto']); // ✅ Guarda sesión
        alert('Sesión iniciada');
        this.router.navigate(['/agregar-producto']);
      },
      error: (err) => {
        alert('Correo o contraseña inválidos');
        console.error(err);
      }
    });
  }
}
