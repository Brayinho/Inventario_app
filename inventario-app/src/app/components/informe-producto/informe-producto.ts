import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InventarioService } from '../../services/inventario';
import { Producto } from '../../models/producto.model';
import { Movimiento } from '../../models/movimiento.model';

@Component({
  selector: 'app-informe-producto',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './informe-producto.html',
})
export class InformeProductoComponent implements OnInit {
  productos: Producto[] = [];
  productoSeleccionado: Producto | null = null;
  informe: any[] = [];

  constructor(private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.inventarioService.listarProductos().subscribe({
      next: (res) => this.productos = res,
      error: (err) => console.error(err)
    });
  }

  verInforme() {
    if (!this.productoSeleccionado) return;

    this.inventarioService.obtenerMovimientos(this.productoSeleccionado.id).subscribe({
      next: (movs) => {
        this.productoSeleccionado!.movimientos = movs;
        this.generarInforme(this.productoSeleccionado!);
      },
      error: (err) => console.error(err)
    });
  }

  generarInforme(producto: Producto) {
    const ventas = producto.movimientos.filter(m => m.tipo === 'venta');
    const cantidadVendida = ventas.reduce((acc, m) => acc + m.cantidad, 0);

    const calcularPromedio = (): number => {
      const compras = producto.movimientos.filter(m => m.tipo === 'compra');
      let totalCantidad = 0, totalCosto = 0;
      for (const mov of compras) {
        totalCantidad += mov.cantidad;
        totalCosto += mov.cantidad * mov.valorUnitario;
      }
      return totalCantidad > 0 ? totalCosto / totalCantidad : 0;
    };

    const calcularCostoPEPS = (): number => {
      const compras = producto.movimientos
        .filter(m => m.tipo === 'compra')
        .sort((a, b) => new Date(a.fecha.toString())
.getTime() - new Date(b.fecha.toString())
.getTime());

      let restante = cantidadVendida;
      let costoTotal = 0;

      for (const compra of compras) {
        if (restante <= 0) break;
        const tomar = Math.min(compra.cantidad, restante);
        costoTotal += tomar * compra.valorUnitario;
        restante -= tomar;
      }

      return costoTotal;
    };

    const calcularCostoUEPS = (): number => {
      const compras = producto.movimientos
        .filter(m => m.tipo === 'compra')
        .sort((a, b) => new Date(a.fecha.toString())
.getTime() - new Date(b.fecha.toString())
.getTime());

      let restante = cantidadVendida;
      let costoTotal = 0;

      for (const compra of compras) {
        if (restante <= 0) break;
        const tomar = Math.min(compra.cantidad, restante);
        costoTotal += tomar * compra.valorUnitario;
        restante -= tomar;
      }

      return costoTotal;
    };

    const promedio = calcularPromedio();
    const peps = calcularCostoPEPS();
    const ueps = calcularCostoUEPS();

    this.informe = [
      {
        metodo: 'Promedio Ponderado',
        costoUnitario: promedio,
        ventasTotales: cantidadVendida * promedio,
        unidadesVendidas: cantidadVendida
      },
      {
        metodo: 'PEPS',
        costoUnitario: peps / cantidadVendida,
        ventasTotales: peps,
        unidadesVendidas: cantidadVendida
      },
      {
        metodo: 'UEPS',
        costoUnitario: ueps / cantidadVendida,
        ventasTotales: ueps,
        unidadesVendidas: cantidadVendida
      }
    ];
  }
}
