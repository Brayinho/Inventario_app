import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InventarioService } from '../../services/inventario';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AgregarProductoComponent {
  nuevoProducto: Producto = {
    id: 0,
    nombre: '',
    categoria: '',
    stock: 0,
    movimientos: []
  };

  constructor(private inventarioService: InventarioService) {}

  agregarProducto() {
    // El backend genera el ID, no lo pongas tú
    const productoParaEnviar = {
      nombre: this.nuevoProducto.nombre,
      categoria: this.nuevoProducto.categoria,
      stock: this.nuevoProducto.stock
    };

    this.inventarioService.agregarProducto(productoParaEnviar as Producto).subscribe({
      next: (res) => {
        alert('✅ Producto agregado correctamente');
        this.nuevoProducto = { id: 0, nombre: '', categoria: '', stock: 0, movimientos: [] };
      },
      error: (err) => {
        console.error(err);
        alert('❌ Error al agregar el producto');
      }
    });
  }
}
