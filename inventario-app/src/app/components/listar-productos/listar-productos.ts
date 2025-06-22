import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventarioService } from '../../services/inventario';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './listar-productos.html',
  styleUrls: ['./listar-productos.css']
})
export class ListarProductosComponent implements OnInit {
  productos = signal<Producto[]>([]);
  // Para edición en línea
  editandoId: number | null = null;
  modeloEdicion: Partial<Producto> = {};

  constructor(private inv: InventarioService) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.inv.listarProductos().subscribe(list => {
      this.productos.set(list);
      this.editandoId = null;
    });
  }

  eliminar(producto: Producto) {
    if (!confirm(`¿Eliminar "${producto.nombre}"?`)) return;
    this.inv.eliminarProducto(producto.id).subscribe({
      next: () => this.cargar(),
      error: e => alert('Error al eliminar')
    });
  }

  empezarEdicion(p: Producto) {
    this.editandoId = p.id;
    // Clonamos datos actuales
    this.modeloEdicion = { ...p };
  }

  cancelarEdicion() {
    this.editandoId = null;
  }

  guardarEdicion() {
    const datos = this.modeloEdicion as Producto;
    this.inv.actualizarProducto(datos).subscribe({
      next: () => this.cargar(),
      error: e => alert('Error al guardar')
    });
  }
}
