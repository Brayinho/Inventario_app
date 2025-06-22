export interface Movimiento {
    tipo: 'compra' | 'venta';
    cantidad: number;
    valorUnitario: number;
    fecha: String;
}
