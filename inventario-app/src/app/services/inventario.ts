import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto.model';
import { Movimiento } from '../models/movimiento.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private apiUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) { }

  // ✅ PRODUCTOS
  agregarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiUrl}/producto`, producto);
  }
  

  listarProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/producto`);
  }

  actualizarProducto(prod: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/producto/${prod.id}`, prod);
  }

  eliminarProducto(id: number): Observable<{ mensaje: string }> {
    return this.http.delete<{ mensaje: string }>(`${this.apiUrl}/producto/${id}`);
  }
  
  obtenerMovimientos(idProducto: number): Observable<Movimiento[]> {
  return this.http.get<Movimiento[]>(`${this.apiUrl}/movimiento/${idProducto}`);
}

  // ✅ MOVIMIENTOS
registrarMovimiento(idProducto: number, movimiento: Movimiento): Observable<any> {
  return this.http.post(`${this.apiUrl}/movimiento/${idProducto}`, movimiento);
}


  // ✅ FUNCIONES PARA INFORMES (realizadas en frontend)
  calcularPromedioPonderado(producto: Producto): number {
    const compras = producto.movimientos?.filter(m => m.tipo === 'compra') || [];
    let totalCantidad = 0;
    let totalCosto = 0;

    for (const mov of compras) {
      totalCantidad += mov.cantidad;
      totalCosto += mov.cantidad * mov.valorUnitario;
    }

    return totalCantidad > 0 ? totalCosto / totalCantidad : 0;
  }

  calcularCostoPEPS(producto: Producto, cantidadVendida: number): number {
    const compras = (producto.movimientos || [])
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
  }

  calcularCostoUEPS(producto: Producto, cantidadVendida: number): number {
    const compras = (producto.movimientos || [])
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
  }

  generarInforme(producto: Producto) {
    const ventas = producto.movimientos?.filter(m => m.tipo === 'venta') || [];
    const cantidadVendida = ventas.reduce((acc, m) => acc + m.cantidad, 0);

    return [
      {
        metodo: 'Promedio Ponderado',
        costoUnitario: this.calcularPromedioPonderado(producto),
        ventasTotales: cantidadVendida * this.calcularPromedioPonderado(producto),
        unidadesVendidas: cantidadVendida
      },
      {
        metodo: 'PEPS',
        costoUnitario: cantidadVendida > 0 ? this.calcularCostoPEPS(producto, cantidadVendida) / cantidadVendida : 0,
        ventasTotales: this.calcularCostoPEPS(producto, cantidadVendida),
        unidadesVendidas: cantidadVendida
      },
      {
        metodo: 'UEPS',
        costoUnitario: cantidadVendida > 0 ? this.calcularCostoUEPS(producto, cantidadVendida) / cantidadVendida : 0,
        ventasTotales: this.calcularCostoUEPS(producto, cantidadVendida),
        unidadesVendidas: cantidadVendida
      }
    ];
  }
}
