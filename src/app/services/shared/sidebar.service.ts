import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any = [
    {
      titulo: 'Inicio',
      icono: 'mdi mdi-home',
      hijos: [],
      url: '/inicio'
    },
    {
      titulo: 'Clientes',
      icono: 'mdi mdi-calendar-text',
      hijos: [],
      url: '/clientes'
    },
    {
      titulo: 'Polizas',
      icono: 'mdi mdi-view-list',
      hijos: [],
      url: '/polizas'
    },
    {
      titulo: 'Agentes',
      icono: 'mdi mdi-account-multiple',
      url: '/agentes'
    }
  ];
  constructor() { }
}
