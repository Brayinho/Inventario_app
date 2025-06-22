import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto';
import { RegistrarMovimientoComponent } from './components/registrar-movimiento/registrar-movimiento';
import { InformeProductoComponent } from './components/informe-producto/informe-producto';
import { AuthGuard } from './guards/auth.guard'; // función, no clase
import { ListarProductosComponent } from './components/listar-productos/listar-productos';
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'listar-productos', component: ListarProductosComponent, canActivate: [AuthGuard] },

    // rutas protegidas
    { path: 'agregar-producto', component: AgregarProductoComponent, canActivate: [AuthGuard] },
    { path: 'registrar-movimiento', component: RegistrarMovimientoComponent, canActivate: [AuthGuard] },
    { path: 'informe-producto', component: InformeProductoComponent, canActivate: [AuthGuard] }
];
