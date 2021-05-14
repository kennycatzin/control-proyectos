import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ProyectosddpComponent } from './proyectosddp.component';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { sharedModule } from '../shared/shared.module';
import { CUENTAS_ROUTES } from './proyectosddp.routes';
import { MatTabsModule } from '@angular/material';
import { InicioComponent } from './inicio/inicio.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PendientesComponent } from './pendientes/pendientes.component';
import { CompromisosComponent } from './compromisos/compromisos.component';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { CompromisoComponent } from './pendientes/compromiso/compromiso.component';
import { BitacoraCompromisoComponent } from './bitacora-compromiso/bitacora-compromiso.component';
import { BitacoraPendienteComponent } from './bitacora-pendiente/bitacora-pendiente.component';





@NgModule({
  declarations: [
    InicioComponent,
    UsuariosComponent,
    ProyectosddpComponent,
    PendientesComponent,
    CompromisosComponent,
    BitacoraComponent,
    CompromisoComponent,
    BitacoraCompromisoComponent,
    BitacoraPendienteComponent,

  ],
  imports: [
      sharedModule,
      CUENTAS_ROUTES,
      MatTabsModule,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      HttpClientModule
  ],
  exports: [
    UsuariosComponent
  ],
  providers: [],
  bootstrap: []
})
export class ProyectosddpModule {}
