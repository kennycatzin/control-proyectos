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
      titulo: 'Pendientes',
      icono: 'mdi mdi-calendar-text',
      hijos: [],
      url: '/pendientes'
    },
    {
      titulo: 'Compromisos',
      icono: 'mdi mdi-view-list',
      hijos: [],
      url: '/compromisos'
    },
    {
      titulo: 'Usuarios',
      icono: 'mdi mdi-account-multiple',
      url: '/usuarios'
    }
  ];
  constructor() { }
}
