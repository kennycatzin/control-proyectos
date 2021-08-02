import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { Router } from '@angular/router';
import swal from 'sweetalert2';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  forma: FormGroup;
  titularAlerta = '';
  durationInSeconds = 5;
  usuario: Usuario = new Usuario("", "", "", "", 0) ;
  cargando = false;
  objeto: any[];
  totalRegistros = 0;
  desde = 0;
  paginado = true;
  objEliminar= {
    "usuario": "admin",
    "id": 0
  };
  constructor( public usuarioService: UsuarioService,
               public router: Router
    ) { }
    ngOnInit() {
      this.traerDatos();
    }

  sonIguales( campo1: string, campo2: string) {
    return ( group: FormGroup ) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      if (pass1 === pass2) {
        return null;
      }
      return {
      sonIguales: true
      };
    };

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
    if (this.usuario.id) {
      this.usuarioService.actualizar(this.usuario.id, this.usuario)
      .subscribe( objeto => {
        this.traerDatos();
      });
      document.getElementById("cierraModal").click();

    } else {
      this.usuarioService.crearUsuario( this.usuario)
      .subscribe( objeto => {
        document.getElementById("cierraModal").click();
        this.traerDatos();
      });

    }
  }
  actulizar(usuario: Usuario) {
    this.usuario = usuario;
    // this.alimentoService.actualizar(this.alimento.id, this.alimento)
    // .subscribe( objeto => {
    //   console.log(objeto);
    //   this.traerDatos();
    // });
    // .subscribe();
}
  busqueda(termino: string) {
    if (termino === '') {
      this.traerDatos();
      return;
    }
    this.usuarioService.busqueda(termino)
          .subscribe((obj: any[]) => {
          this.paginado = false;
           this.objeto = obj;
    });
  }
  borrar(usuario: Usuario) {
    swal.fire({
      title: '¿Desea confirmar?',
      text: 'Se eliminará este registro permanentemente',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar'
    }).then((result) => {
      if (result.value) {
        this.objEliminar.id = usuario.id;
       this.usuarioService.borrar(this.objEliminar)
         .subscribe(resp => {
           this.traerDatos();
         });
      }
    });
  }


  traerDatos() {
    this.cargando = true;
    this.usuarioService.obtenerUsuarios(this.desde)
    .subscribe( (data: any) => {
      console.log(data);
      this.paginado = true;
      this.objeto = data.users;
      this.totalRegistros = data.numero;
      this.cargando = false;
      console.log(data);
    });
  }

  nuevo() {
    // this.ejercicio = new Ejercicio('', 0, '');
   this.usuario= new Usuario("", "", "", "", 0);
   }

}
