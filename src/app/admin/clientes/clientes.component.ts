import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';
import { Persona } from 'src/app/models/persona.model';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  forma: FormGroup;
  titularAlerta = '';
  durationInSeconds = 5;
  cliente: Cliente = new Cliente(0,0,0) ;
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
  constructor(public clienteService: ClientesService,
              public router: Router) { }

  ngOnInit(): void {
    this.traerDatos();
  }
  traerDatos() {
    this.cargando = true;
    this.clienteService.obtenerClientes(this.idAgente, this.desde)
    .subscribe( (data: any) => {
      console.log(data);
      this.paginado = true;
      this.objeto = data.data;
      this.totalRegistros = data.numero;
      this.cargando = false;
      console.log(data);
    });
  }
  guardarCatalogo(f: NgForm){
    if ( f.invalid ) {
      return;
    }
    if (this.persona.id_persona) {
      this.clienteService.actualizar(0, this.persona)
      .subscribe( objeto => {
        // this.objObservacion.id_movimiento = objeto["id_movimiento"];
        this.traerDatos();
      });
      document.getElementById("cierraModal").click();
      document.getElementById("openModalButton").click();

    } else {
      this.clienteService.crearElemento( this.persona, this.idAgente)
      .subscribe( objeto => {
        document.getElementById("cierraModal").click();
        this.traerDatos();
      });

    }
  }
  nuevo() {
    // this.ejercicio = new Ejercicio('', 0, '');
   this.persona= new Persona("", "", "", "", 0);
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

        this.clienteService.borrar(this.objEliminar)
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
    this.traerDatos();
  }
  actulizar(persona: Persona) {
    console.log(persona);
    this.persona.email = persona.email;
    this.persona.nombre = persona.nombre;
    this.persona.telefono = persona.telefono;
    this.persona.fecha_nacimiento = persona.fecha_nacimiento;
    this.persona.id_persona = persona.id_persona;

    // this.alimentoService.actualizar(this.alimento.id, this.alimento)
    // .subscribe( objeto => {
    //   console.log(objeto);
    //   this.traerDatos();
    // });
    // .subscribe();
}



}
