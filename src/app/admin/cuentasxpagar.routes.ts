import { Routes, RouterModule, Router } from '@angular/router';
import { CuentasxpagarComponent } from './cuentasxpagar.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginGuardGuard } from '../services/service.index';
import { PasienteComponent } from './pasiente/pasiente.component';
import { AlimentosComponent } from './alimentos/alimentos.component';
import { EjerciciosComponent } from './ejercicios/ejercicios.component';
import { PerfilComponent } from './pasiente/perfil.component';
const cuentasRoutes: Routes = [
    {
        path: '',
        component: CuentasxpagarComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'inicio', component:  InicioComponent},
            { path: 'proveedores', component:  ProveedoresComponent},
            { path: 'usuarios', component: UsuariosComponent },
            { path: 'solicitudes', component: SolicitudComponent },
            { path: 'alimento', component: AlimentosComponent },
            { path: 'ejercicio', component: EjerciciosComponent },
            { path: 'pasiente', component: PasienteComponent },
            { path: 'perfil/:id', component: PerfilComponent },

            { path: '', redirectTo: '/login', pathMatch: 'full'},

        ]
    },
];

        // canActivate: [ LoginGuardGuard ],
export const CUENTAS_ROUTES = RouterModule.forChild( cuentasRoutes );
