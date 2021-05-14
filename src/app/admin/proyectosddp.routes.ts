import { BitacoraCompromisoComponent } from './bitacora-compromiso/bitacora-compromiso.component';
import { BitacoraPendienteComponent } from './bitacora-pendiente/bitacora-pendiente.component';
import { CompromisoComponent } from './pendientes/compromiso/compromiso.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { ProyectosddpComponent } from './proyectosddp.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginGuardGuard } from '../services/service.index';
import { PendientesComponent } from './pendientes/pendientes.component';
import { CompromisosComponent } from './compromisos/compromisos.component';

import { BitacoraComponent } from './bitacora/bitacora.component';
const cuentasRoutes: Routes = [
    {
        path: '',
        component: ProyectosddpComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'inicio', component:  InicioComponent},
            { path: 'pendientes', component: PendientesComponent },
            { path: 'compromisos', component: CompromisosComponent },
            { path: 'bitacora', component: BitacoraComponent },
            { path: 'usuarios', component: UsuariosComponent },
            { path: 'bitacora-pendiente', component: BitacoraPendienteComponent },
            { path: 'bitacora-compromiso', component: BitacoraCompromisoComponent },
            { path: 'compromiso/:id', component: CompromisoComponent },

            { path: '', redirectTo: '/login', pathMatch: 'full'},

        ]
    },
];

        // canActivate: [ LoginGuardGuard ],
export const CUENTAS_ROUTES = RouterModule.forChild( cuentasRoutes );
