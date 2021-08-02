import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../../config/config';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
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
      localStorage.setItem('usuario', usuario.nombre);


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
    const url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
    .pipe(map( (resp: any) => {
       this.varia = resp.id;
       this.guardarStorage(resp.agente.id, resp.token, resp.agente, resp.menu);
       return true;
    }), catchError(err => {
      swal.fire('Credenciales incorrectas', '' + usuario.email + '', 'error');
      return throwError(err);
    }));
  }


  crearUsuario( usuario: Usuario) {
    const url = URL_SERVICIOS + '/register';
    return this.http.post( url, usuario )
      .pipe(map( (resp: any) => {
        swal.fire('Usuario creado exitósamente', '' + usuario.email + '', 'success');
        return resp.usuario;
      }), catchError(err => {
        swal.fire(err.error.mensaje,  'Ha ocurrido un error', 'error');
        return Observable.throw(err);
      }));
    }
    actualizar(id: number, usuario: Usuario) {
      const url = URL_SERVICIOS + '/usuario/editar-usuario';
      return this.http.post(url, usuario)
      .pipe(map((resp: any) => {
        swal.fire('Registro Actualizado', 'El registro se ha actualizado correctamente', 'success');
        return true;
      }));
    }

    obtenerUsuarios( desde: number = 0) {
        const url = URL_SERVICIOS + '/agentes';
        return this.http.get(url);
    }
  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    localStorage.removeItem('tipo');
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
  borrar(obj: any) {
    const url = URL_SERVICIOS + '/usuario/delete-usuario';
    return this.http.post(url, obj)
    .pipe(map((resp: any) => {
      swal.fire('Registro eliminado', 'El registro se ha eliminado correctamente', 'success');
      return true;
    }));
  }
  busqueda( nombre: string ) {
    const objeto = {
      "buscador": nombre
    }
    let url = URL_SERVICIOS + '/usuario/busqueda';
    return this.http.post(url, objeto)
            .pipe(map((resp: any) => resp.data));
  }
}

