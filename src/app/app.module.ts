import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { APP_ROUTING } from './app.routes';
// import { CuentasxpagarModule, cuentasxpagarModule } from './erp/cuentasxpagar/cuentasxpagar.module';
import { CuentasxpagarModule } from './admin/cuentasxpagar.module';

import { MatTabsModule } from '@angular/material';


import { LoginComponent } from './login/login.component';



import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RegistroComponent } from './login/registro.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent,
    RegistroComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    APP_ROUTING,
    CuentasxpagarModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
