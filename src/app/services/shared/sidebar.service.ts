import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any = [
    {
      titulo: 'Inicio',
      icono: 'mdi mdi-home',
      url: '/inicio'
    },
    {
      titulo: 'Pendientes',
      icono: 'mdi mdi-calendar-text',
      url: '/usuarios'
    },
    {
      titulo: 'Compromisos',
      icono: 'mdi mdi-view-list',
      url: '/alimento'
    },
    {
      titulo: 'Bitácora',
      icono: 'mdi mdi-book-open',
      url: '/ejercicio'
    },
    {
      titulo: 'Pasiente',
      icono: 'mdi mdi-emoticon',
      url: '/pasiente'
    }
  ];
  constructor() { }
}
