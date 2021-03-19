import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../../config/config';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
// import { SubirArchivoService } from '../archivos/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any = [];
  varia = '';
  constructor(public http: HttpClient,
              public router: Router) {
      this.cargarStorage();
  }
  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {
      localStorage.setItem('id', id);
      localStorage.setItem('token', token);

      this.usuario = usuario;
      this.token = token;
  }
  estalogueado() {
    return (this.token.length > 5 ) ? true : false;
  }
  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');


    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  login( usuario: Usuario, recordar: boolean ) {
    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVICIOS + '/auth/login';
    console.log(url);
    console.log(usuario);
    return this.http.post( url, usuario )
    .pipe(map( (resp: any) => {
       console.log(resp);
       this.varia = resp.id;
       this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
       return true;
    }), catchError(err => {
      swal.fire('Credenciales incorrectas', '' + usuario.email + '', 'error');
      return throwError(err);
    }));
  }


  crearUsuario( usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario )
      .pipe(map( (resp: any) => {
        swal.fire('Usuario creado exitósamente', '' + usuario.email + '', 'success');
        return resp.usuario;
      }), catchError(err => {
        swal.fire(err.error.mensaje,  'Ha ocurrido un error', 'error');
        return Observable.throw(err);
      }));
    }

    obtenerUsuarios( desde: number = 0) {
        const url = URL_SERVICIOS + '/usuario?desde=' + desde;
        return this.http.get(url);
    }
  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }
  // cambiarImagen(archivo: File, id: string) {
  //   this.subirArchivo.subirArchivo(archivo, 'usuarios', id)
  //   .then( (resp: any) => {
  //     swal.fire('Operación exitosa', '' + resp.mensaje + '', 'success');
  //   })
  //   .catch( (resp: any) => {
  //     swal.fire('Operación con errores', '' + resp.mensaje + '', 'info');
  //   });
  // }
  buscarUsuario( nombre: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + nombre;
    return this.http.get(url)
            .pipe(map((resp: any) => resp.usuarios));

  }
  borrarUsuario(id: string) {
    const url = URL_SERVICIOS + '/usuario/' + id;
    return this.http.delete(url)
    .pipe(map((resp: any) => {
      swal.fire('Usuario eliminado', 'El usuario se ha eliminado correctamente', 'success');
      return true;
    }));
  }
}

