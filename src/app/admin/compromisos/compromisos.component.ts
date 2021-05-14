import { UsuarioService } from 'src/app/services/service.index';
import { CompromisoService } from './../../services/compromiso/compromiso.service';
import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClasificacionService } from 'src/app/services/clasificacion/clasificacion.service';
import { PendienteService } from 'src/app/services/pendiente/pendiente.service';
import { Clasificacion } from 'src/app/models/clasificacion.model';
import { Pendiente } from 'src/app/models/pendiente.model';
import { Compromiso } from 'src/app/models/compromiso.model';
import { RUTAARCHIVOS } from 'src/config/config';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-compromisos',
  templateUrl: './compromisos.component.html',
  styleUrls: ['./compromisos.component.css']
})
export class CompromisosComponent implements OnInit {

  constructor(public clasificacionService: ClasificacionService,
    public pendienteService: PendienteService,
    public compromisoService: CompromisoService,
    public usuarioService: UsuarioService) { }
  cargando = false;
  archivo: File = null;
  pendiente: any; //= new Pendiente(0, "", "", 0, "", 0, '', '', "", 0, 0, 0);
  estatus: any[];
  clasificaciones: any[];
  pendientes: Pendiente[];
  id_pendiente =0;
  desde = 0;
  pendienteID = 0;
  objeto: any[];
  rutaArchivo = RUTAARCHIVOS + '/upload/compromisos/';
  totalRegistros = 0;
  compromisoID = 0;
  miEstatus = 0;
  nombre = "";
  fileName= 'ExcelSheet.xlsx';  
  compromiso: Compromiso = new Compromiso(0, "", "", "", localStorage.getItem('usuario'), "", 0, 0);
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

  ngOnInit() {
    this.getClaisificaciones();
    this.traerPendientes();
    this.getStatus();
  }
  getPorEstatus($event) {
    this.miEstatus = $event;
    // this.getPorEstaus($event);
    // I want to do something here with the new selectedDevice, but what I
    // get here is always the last selection, not the one I just selected.
}
  exportexcel(): void 
  {
     /* table id is passed over here */   
     let element = document.getElementById('bitPendientes'); 
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, this.fileName);
    
  }
  getClaisificaciones() {
    this.clasificacionService.getEstatus()
    .subscribe( (data: any) => {
    this.clasificaciones = data.data;
    });
  }
  getStatus() {
    this.clasificacionService.getEstatus()
    .subscribe( (data: any) => {
    this.estatus = data.data;
    });
  }
  traerPendientes() {
    this.pendienteService.getPendientesPaginacion(this.desde)
    .subscribe( (data: any) => {
      this.pendientes = data.data;     
    });
  }
  seleccionImagen(  archivo: File ) {
    if (!archivo) {
      this.archivo = null;
      return;
    }
    this.archivo = archivo;
  }
  cambiaPendiente($event) {
    this.id_pendiente = $event;
    this.nombre = "";
    this.miEstatus = 0;
    this.traerDatos();

    // I want to do something here with the new selectedDevice, but what I
    // get here is always the last selection, not the one I just selected.
}
  traerDatos() {
    this.cargando = true;
    this.compromisoService.getDataCompromiso(this.id_pendiente, this.miEstatus, this.nombre)
    .subscribe( (data: any) => {
      this.objeto = data.data;
      this.totalRegistros = data.numero;
      this.cargando = false;
    });
  }
  nuevo() {
 //    this.pendiente= new Pendiente(0, "", "", 0, "", 0, '', '', "", "", 0, 0);
   }
   busqueda(termino: string) {
    if (termino === '') {
      //this.traerDatos();
      return;
    }
    // this.pendienteService.busqueda(termino)
    //       .subscribe((obj: any[]) => {
    //        this.objeto = obj;
    // });
  }
  borrar(compromiso: any) {
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
      this.objEliminar.id_pendiente = this.id_pendiente;
      this.compromisoService.borrar(this.objEliminar)
        .subscribe(resp => {
          this.traerDatos();
        });
      }
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
   // this.traerDatos();
  }
  guardarCatalogo(f: NgForm) {
    if ( f.invalid ) {
      return;
    }
    if (this.pendiente.id_pendiente) {
      // this.pendienteService.actualizar(this.pendiente.id_pendiente, this.pendiente)
      // .subscribe( objeto => {
      //   console.log(objeto);
      //   this.traerDatos();
      // });
      document.getElementById("cierraModal").click();
      document.getElementById("openModalButton").click();

    } else {
      // this.pendienteService.crearElemento( this.pendiente )
      // .subscribe( objeto => {
      //   document.getElementById("cierraModal").click();
      //   console.log(objeto);
      //   this.traerDatos();
      // });

    }
  }
  getFiltrado() {
    if(this.miEstatus == 0 && this.nombre == ""){
      this.traerDatos();
      return;
    }
    this.cargando = true;
    this.compromisoService.getDataCompromiso(this.id_pendiente, this.miEstatus, this.nombre)
    .subscribe( (data: any) => {
      this.objeto = data.data;
      this.cargando = false;
    });
  }

actulizar(compromiso: Compromiso) {
  this.objObservacion.id_compromiso = compromiso.id_compromiso
  this.compromisoID = compromiso.id_compromiso;
  this.compromiso = compromiso;
}
guardarCompromiso(f: NgForm) {
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
    this.compromisoService.crearElemento( this.compromiso, this.archivo )
    .subscribe( objeto => {
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
    document.getElementById("cierraModalObs").click();
    this.traerDatos();
  });
}

}
