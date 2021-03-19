import { Component, OnInit } from '@angular/core';
import { EjercicioService } from 'src/app/services/ejercicio/ejercicio.service';
import { Ejercicio } from '../../models/ejercicio.model';
import { NgForm } from '@angular/forms';
import { Clasificacion } from '../../models/clasificacion.model';
import { ClasificacionService } from '../../services/clasificacion/clasificacion.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.css']
})
export class EjerciciosComponent implements OnInit {

  constructor(public ejercicioService: EjercicioService,
              public clasificacionService: ClasificacionService) { }
    ejercicio: Ejercicio = new Ejercicio('', 0, '');
    cargando = false;
    desde = 0;
    objeto: any[];
    totalRegistros = 0;
    clasificaciones: Clasificacion[];
  ngOnInit() {
    this.getClaisificaciones();
    this.traerDatos();
  }
  getClaisificaciones() {
    this.clasificacionService.getClasificacionAlimentacion()
    .subscribe( (data: any) => {
    this.clasificaciones = data.data;
    });
  }

  borrar(ejercicio: Ejercicio) {
    swal.fire({
      title: '¿Desea confirmar?',
      text: 'Se eliminará este registro permanentemente',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar'
    }).then((result) => {
      if (result.value) {
       this.ejercicioService.borrar(ejercicio.id)
         .subscribe(resp => {
           this.traerDatos();
         });
      }
    });
  }
  nuevo() {
    this.ejercicio = new Ejercicio('', 0, '');
  }
  actulizar(ejercicio: Ejercicio) {
    console.log(ejercicio);
    this.ejercicio = ejercicio;
    // this.alimentoService.actualizar(this.alimento.id, this.alimento)
    // .subscribe( objeto => {
    //   console.log(objeto);
    //   this.traerDatos();
    // });
    // .subscribe();
}
guardarCatalogo(f: NgForm) {
  if ( f.invalid ) {
    return;
  }
  console.log(this.ejercicio);
  if (this.ejercicio.id) {
    this.ejercicioService.actualizar(this.ejercicio.id, this.ejercicio)
    .subscribe( objeto => {
      console.log(objeto);
      this.traerDatos();
    });
  } else {
    this.ejercicioService.crearElemento( this.ejercicio )
    .subscribe( objeto => {
      console.log(objeto);
      this.traerDatos();
    });
  }
}
traerDatos() {
  this.cargando = true;
  this.ejercicioService.getElementoPaginacion(this.desde)
  .subscribe( (data: any) => {
    console.log(data);
    this.objeto = data.data;
    console.log(this.objeto);
    this.totalRegistros = data.numero;
    this.cargando = false;
  });
}
 busqueda(termino: string) {
  if (termino === '') {
    this.traerDatos();
    return;
  }
  this.ejercicioService.busqueda(termino)
        .subscribe((alimento: Ejercicio[]) => {
          this.objeto = alimento;
  });
}
cambiarDesde(numero: number) {
  const desde = this.desde + numero;
  if (desde >= this.totalRegistros) {
    return;
  }
  if (desde < 0 ) {
    return;
  }
  this.desde += numero;
  this.traerDatos();
}
}
