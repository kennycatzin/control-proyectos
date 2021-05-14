import { InicioService } from './../../services/inicio/inicio.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: []
})
export class InicioComponent implements OnInit {

  constructor(public inicioService: InicioService) { }
  tipo = 1;
  cargando = false;
  pendientes: any[];
  compromisos: any[];
  objcomproVenc: any[];
  objActPend: any[];
  totalRegistros = 0;

  rePen = 0;
  epPen = 0;
  eePen = 0;

  reCom = 0;
  epCom = 0;
  eeCom = 0;
  veCom = 0;


  ngOnInit() {
    this.traerDatos();
  }
  getTablero($event) {
    this.tipo = $event;
    this.traerDatos();
    // I want to do something here with the new selectedDevice, but what I
    // get here is always the last selection, not the one I just selected.
}
traerDatos() {
  this.cargando = true;
  this.inicioService.getTablero(this.tipo)
  .subscribe( (data: any) => {
    this.pendientes = data.pendientes;
    
    for (const item of this.pendientes) {   
      if(item.descripcion == "En espera"){
        switch(item.descripcion) { 
          case "En espera": { 
             this.eePen = item.cantidad 
             break; 
          } 
          case "Finalizado": {    
             break; 
          } 
          case "En proceso": { 
            this.epPen = item.cantidad; 
            break; 
         } 
          case "Resueltos": { 
            this.rePen = item.cantidad; 
            break; 
         } 
          default: { 
             //statements; 
             break; 
          } 
       } 
      }
   }

    this.compromisos = data.compromisos;

    for (const item of this.compromisos) {
      
      if(item.descripcion == "En espera"){
        switch(item.descripcion) { 
          case "En espera": { 
             this.eeCom = item.cantidad 
             break; 
          } 
          case "Vencidos": { 
              this.veCom = item.cantidad;
             break; 
          } 
          case "En proceso": { 
            this.epCom = item.cantidad; 
            break; 
         } 
          case "Resueltos": { 
            this.reCom = item.cantidad; 
            break; 
         } 
          default: { 
             //statements; 
             break; 
          } 
       } 
      }
    }
    this.objcomproVenc = data.vencidos;
    this.objActPend = data.movimientos;
    this.cargando = false;
  });
}


}
