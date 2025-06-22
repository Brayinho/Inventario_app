import { Movimiento } from "./movimiento.model";
export interface Producto {
    id: number;
    nombre: string;
    categoria: string;
    stock: number;
    movimientos: Movimiento[];
}

