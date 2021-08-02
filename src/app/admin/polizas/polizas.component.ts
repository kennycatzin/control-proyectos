import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona } from 'src/app/models/persona.model';
import { PolizaService } from 'src/app/services/poliza/poliza.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-polizas',
  templateUrl: './polizas.component.html',
  styleUrls: ['./polizas.component.css']
})
export class PolizasComponent implements OnInit {
  forma: FormGroup;
  titularAlerta = '';
  durationInSeconds = 5;
  persona: Persona = new Persona("", "", "", "", 0);
  cargando = false;
  objeto: any[];
  totalRegistros = 0;
  desde = 0;
  paginado = true;
  idAgente = localStorage.getItem("id");
  objEliminar= {
    "id_persona": 0,
    "id_cliente": 0
  };
  constructor(public polizaService: PolizaService,
              public router: Router) { }

  ngOnInit(): void {
    this.traerDatos();
  }
  traerDatos() {
    this.cargando = true;
    this.polizaService.obtenerPolizas(this.idAgente, this.desde)
    .subscribe( (data: any) => {
      console.log(data);
      this.paginado = true;
      this.objeto = data.data;
      this.totalRegistros = data.numero;
      this.cargando = false;
      console.log(data);
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
  nuevo() {
    // this.ejercicio = new Ejercicio('', 0, '');
   // this.persona= new Persona("", "", "", "", 0);
   }
   borrar(obj: any) {
    swal.fire({
      title: '¿Desea confirmar?',
      text: 'Se eliminará este registro permanentemente',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar'
    }).then((result) => {
      if (result.value) {
        this.objEliminar.id_persona = obj.id_persona;
        this.objEliminar.id_cliente = obj.id_cliente;
  
        this.polizaService.borrar(this.objEliminar)
          .subscribe(resp => {
            this.traerDatos();
          });
      }
    });
  }
  guardarCatalogo(f: NgForm){
    if ( f.invalid ) {
      return;
    }
      this.polizaService.crearElemento(0, "")
      .subscribe( objeto => {
        // this.objObservacion.id_movimiento = objeto["id_movimiento"];
        this.traerDatos();
      });
      document.getElementById("cierraModal").click();
      document.getElementById("openModalButton").click();

    
  }

}
