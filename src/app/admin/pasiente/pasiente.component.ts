import { Component, OnInit } from '@angular/core';
import { PasienteService } from 'src/app/services/pasiente/pasiente.service';
import { Pasiente } from '../../models/pasiente.model';
import { NgForm } from '@angular/forms';
import { Clasificacion } from '../../models/clasificacion.model';
import { ClasificacionService } from '../../services/clasificacion/clasificacion.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-pasiente',
  templateUrl: './pasiente.component.html',
  styleUrls: ['./pasiente.component.css']
})
export class PasienteComponent implements OnInit {

  constructor(public pasienteService: PasienteService,
              public clasificacionService: ClasificacionService) { }
 pasiente: Pasiente = new Pasiente('', '', '', '',  0, '', '');
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
  borrar(pasiente: Pasiente) {
    swal.fire({
      title: '¿Desea confirmar?',
      text: 'Se eliminará este registro permanentemente',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar'
    }).then((result) => {
      if (result.value) {
       this.pasienteService.borrar(pasiente.id)
         .subscribe(resp => {
           this.traerDatos();
         });
      }
    });
  }
  nuevo() {
    this.pasiente = new Pasiente('', '', '', '', 0, '', '');
  }
  actulizar(pasiente: Pasiente) {
    console.log(pasiente);
    this.pasiente = pasiente;
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
  console.log(this.pasiente);
  if (this.pasiente.id) {
    this.pasienteService.actualizar(this.pasiente.id, this.pasiente)
    .subscribe( objeto => {
      console.log(objeto);
      this.traerDatos();
    });
  } else {
    this.pasienteService.crearPasientes( this.pasiente )
    .subscribe( objeto => {
      console.log(objeto);
      this.traerDatos();
    });
  }
}
traerDatos() {
  this.cargando = true;
  this.pasienteService.getPasientesPaginacion(this.desde)
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
  this.pasienteService.busqueda(termino)
        .subscribe((pasiente: Pasiente[]) => {
          this.objeto = pasiente;
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
 calcularEdad(fecha) {
  const hoy = new Date();
  const cumpleanos = new Date(fecha);
  let edad = hoy.getFullYear() - cumpleanos.getFullYear();
  const m = hoy.getMonth() - cumpleanos.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
  }

  return edad;
}
}
