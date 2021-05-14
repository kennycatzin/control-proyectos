import { UsuarioService } from 'src/app/services/service.index';
import swal from 'sweetalert2';
import { PendienteService } from './../../services/pendiente/pendiente.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Clasificacion } from 'src/app/models/clasificacion.model';
import { Pendiente } from 'src/app/models/pendiente.model';
import { ClasificacionService } from 'src/app/services/clasificacion/clasificacion.service';
import { RUTAARCHIVOS } from 'src/config/config';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.css']
})
export class PendientesComponent implements OnInit {



  constructor( public clasificacionService: ClasificacionService,
                public pendienteService: PendienteService,
                public usuarioService: UsuarioService) { }
  cargando = false;
  archivo: File = null;
  pendiente: Pendiente = new Pendiente(0, "", "", 0, "", 0, '', '',localStorage.getItem('usuario'),this.archivo, 0, 0, 0);
  clasificaciones: Clasificacion[];
  rutaArchivo = RUTAARCHIVOS + '/upload/pendientes/';
  desde = 0;
  pendienteID = 0;
  objeto: any[];
  objEstatus: any[];
  estatus: any[];
  totalRegistros = 0;
  nombre: string = "";
  paginado = true;
  miEstatus: number = 0;
  fileName= 'ExcelSheet.xlsx';  
  objEliminar= {
    "usuario": localStorage.getItem('usuario'),
    "id_pendiente": 0
  };
  objObservacion= {
    "usuario": localStorage.getItem('usuario'),
    "id_pendiente": 0,
    "id_movimiento": 0,
    "descripcion": ""
  };

  ngOnInit() {
    this.getEstatus();
    this.getClasificaciones();
    this.traerDatos();
    this.paginado = true;
  }
  getEstatus() {
    this.clasificacionService.getEstatus()
    .subscribe( (data: any) => {
    this.objEstatus = data.data;
    this.estatus = data.data;

    });
  }
  seleccionImagen(  archivo: File ) {
    if (!archivo) {
      this.archivo = null;
      return;
    }
    this.archivo = archivo;
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

  getClasificaciones() {
    this.clasificacionService.getClasificacion()
    .subscribe( (data: any) => {
    this.clasificaciones = data.data;
    });
  }
  traerDatos() {
    this.cargando = true;
    this.pendienteService.getPendientesPaginacion(this.desde)
    .subscribe( (data: any) => {
      this.paginado = true;
      this.objeto = data.data;
      this.totalRegistros = data.numero;
      this.cargando = false;
    });
  }
  borrar(pendiente: Pendiente) {
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
        this.objEliminar.id_pendiente = pendiente.id_pendiente;
       this.pendienteService.borrar(this.objEliminar)
         .subscribe(resp => {
           this.traerDatos();
         });
      }
    });
  }
  actulizar(pendiente: Pendiente) {
    this.pendiente = pendiente;
    this.objObservacion.id_pendiente = pendiente.id_pendiente;
    this.pendienteID = pendiente.id_pendiente;
    // this.alimentoService.actualizar(this.alimento.id, this.alimento)
    // .subscribe( objeto => {
    //   console.log(objeto);
    //   this.traerDatos();
    // });
    // .subscribe();
}

  nuevo() {
   // this.ejercicio = new Ejercicio('', 0, '');
  this.pendiente= new Pendiente(0, "", "", 0, "", 0, '', '', localStorage.getItem('usuario'), this.archivo, 0, 0, 0);
  }
  busqueda(termino: string) {
    if (termino === '') {
      this.traerDatos();
      return;
    }
    this.pendienteService.busqueda(termino)
          .subscribe((obj: any[]) => {
            this.paginado = false;
           this.objeto = obj;
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
  guardarCatalogo(f: NgForm) {
    if ( f.invalid ) {
      return;
    }
    if (this.pendiente.id_pendiente) {
      this.pendiente.usuario = localStorage.getItem('usuario');
      this.pendienteService.actualizar(this.pendiente.id_pendiente, this.pendiente, this.archivo)
      .subscribe( objeto => {
        this.objObservacion.id_movimiento = objeto["id_movimiento"];
        this.traerDatos();
      });
      document.getElementById("cierraModal").click();
      document.getElementById("openModalButton").click();

    } else {
      this.pendienteService.crearElemento( this.pendiente, this.archivo )
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
    this.pendienteService.guardarObservacion(this.objObservacion)
    .subscribe( objeto => {
      document.getElementById("cierraModalObs").click();
      this.traerDatos();
    });
  }
  getPorEstatus($event) {
    this.miEstatus = $event;
    // this.getPorEstaus($event);
    // I want to do something here with the new selectedDevice, but what I
    // get here is always the last selection, not the one I just selected.
}
getFiltrado() {
  if(this.miEstatus == 0 && this.nombre == ""){
    this.traerDatos();
    return;
  }
  this.cargando = true;
  this.pendienteService.getPorEstatus(this.miEstatus, this.nombre)
  .subscribe( (data: any) => {
    this.paginado = false;
    this.objeto = data.data;
    this.cargando = false;
  });
}

}
