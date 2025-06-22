import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InventarioService } from '../../services/inventario';
import { Movimiento } from '../../models/movimiento.model';
import { Producto } from '../../models/producto.model';


@Component({
  selector: 'app-registrar-movimiento',
  templateUrl: './registrar-movimiento.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class RegistrarMovimientoComponent implements OnInit {
  productos: Producto[] = [];
  idProducto = 0;

  movimiento: Movimiento = {
    tipo: 'compra',
    cantidad: 0,
    valorUnitario: 0,
    fecha: new Date().toISOString()  // Esto es un string

  };

  constructor(private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.inventarioService.listarProductos().subscribe({
      next: (res) => this.productos = res,
      error: (err) => console.error(err)
    });
  }

  registrar() {
    if (!this.idProducto) return alert('Selecciona un producto');

    this.inventarioService.registrarMovimiento(this.idProducto, this.movimiento).subscribe({
      next: () => {
        alert('✅ Movimiento registrado correctamente');
        this.movimiento = {
          tipo: 'compra',
          cantidad: 0,
          valorUnitario: 0,
          fecha: new Date().toISOString()  // Esto es un string
        };
      },
      error: (err) => {
        console.error(err);
        alert('❌ Error al registrar movimiento');
      }
    });
  }
}
