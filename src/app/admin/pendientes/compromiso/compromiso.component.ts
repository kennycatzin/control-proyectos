import { UsuarioService } from 'src/app/services/service.index';
import { ClasificacionService } from 'src/app/services/clasificacion/clasificacion.service';
import { CompromisoService } from './../../../services/compromiso/compromiso.service';
import { Compromiso } from './../../../models/compromiso.model';
import { PendienteService } from './../../../services/pendiente/pendiente.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pendiente } from 'src/app/models/pendiente.model';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { RUTAARCHIVOS } from 'src/config/config';

@Component({
  selector: 'app-compromiso',
  templateUrl: './compromiso.component.html',
  styleUrls: ['./compromiso.component.css']
})
export class CompromisoComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private pendienteService: PendienteService,
              public clasificacionService: ClasificacionService,
              private compromisoService: CompromisoService,
              public usuarioService: UsuarioService) { }
  pendienteID = 0;
  archivo: File = null;
  objeto: any[];
  estatus: any[];
  rutaArchivo = RUTAARCHIVOS + '/upload/compromisos/';

  pendiente: Pendiente = new Pendiente(0, "", "", 0, "", 0, '', '', localStorage.getItem('usuario'), null, 0, 0, 0);
  compromiso: Compromiso = new Compromiso(0, "", "", "", "", localStorage.getItem('usuario'),1,this.pendienteID, 0);
  objEliminar= {
    "usuario": localStorage.getItem('usuario'),
    "id_compromiso": 0,
    "id_pendiente": this.pendienteID
  };
  objObservacion= {
    "usuario": localStorage.getItem('usuario'),
    "id_compromiso": 0,
    "id_movimiento": 0,
    "descripcion": ""
  };
  compromisoID = 0;
    
  ngOnInit() {
    this.activatedRoute.params.subscribe(({id}) => this.cargarSesion(id));
    this.getStatus();
    this.traerDatos();
  }
  cargarSesion( id: number ) {
    this.pendienteID = id;
  }
  seleccionImagen(  archivo: File ) {
    if (!archivo) {
      this.archivo = null;
      return;
    }
    this.archivo = archivo;
  }
  getStatus() {
    this.clasificacionService.getEstatus()
    .subscribe( (data: any) => {
    this.estatus = data.data;
    });
  }
  async traerDatos() {
    await this.pendienteService.getInfoPendiente(this.pendienteID)
    .subscribe( (data: any) => {
      this.pendiente = data.data;
      this.objeto = data.compromisos;
    });
  }
  actulizar(compromiso: Compromiso) {
    this.objObservacion.id_compromiso = compromiso.id_compromiso
    this.compromisoID = compromiso.id_compromiso;
    this.compromiso = compromiso;
}
borrar(compromiso: Compromiso) {
  swal.fire({
    title: '¿Desea confirmar?',
    text: 'Se eliminará este registro permanentemente',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminar'
  }).then((result) => {
    if (result.value) {
      this.objEliminar.usuario = "admin";
      this.objEliminar.id_compromiso = compromiso.id_compromiso;
      this.objEliminar.id_pendiente = this.pendienteID;
     this.compromisoService.borrar(this.objEliminar)
       .subscribe(resp => {
         this.traerDatos();
       });
    }
  });
}
nuevo() {
  // this.ejercicio = new Ejercicio('', 0, '');
  this.compromiso = new Compromiso(0, "", "", "", "", localStorage.getItem('usuario'), 1, this.pendienteID, 0);
 }
  guardarCatalogo(f: NgForm) {
    if ( f.invalid ) {
      return;
    }
    if (this.compromiso.id_compromiso) {
      this.compromiso.usuario = localStorage.getItem('usuario');
      this.compromisoService.actualizar(this.compromiso.id_compromiso, this.compromiso, this.archivo)
      .subscribe( objeto => {
        this.objObservacion.id_movimiento = objeto["id_movimiento"];
        this.traerDatos();
      });
      document.getElementById("cierraModal").click();
      document.getElementById("openModalButton").click();

    } else {
      this.compromisoService.crearElemento( this.compromiso, this.archivo)
      .subscribe( objeto => {
        this.objObservacion.id_movimiento = objeto["id_movimiento"];
        document.getElementById("cierraModal").click();
        this.traerDatos();
      });

    }
  }
  guardarObservacion(f: NgForm) {
    if ( f.invalid ) {
      return;
    }
    this.compromisoService.guardarObservacion(this.objObservacion)
    .subscribe( objeto => {
      this.objObservacion.id_movimiento = objeto["id_movimiento"];
      document.getElementById("cierraModalObs").click();
      this.traerDatos();
    });
  }
}
