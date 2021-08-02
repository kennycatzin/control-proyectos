import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Persona } from 'src/app/models/persona.model';
import { URL_SERVICIOS } from 'src/config/config';
import swal from 'sweetalert2';
import { Observable, throwError } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(public http: HttpClient,
    public router: Router) { }

  obtenerClientes(idAgente   ,desde: number = 0) {
    const url = URL_SERVICIOS + '/clientes/get-clientes/'+idAgente + '/' + desde;
    return this.http.get(url);
}
actualizar(id: number, persona: Persona) {
  const url = URL_SERVICIOS + '/clientes/actualizar-cliente';
  return this.http.put(url, persona)
  .pipe(map((resp: any) => {
    swal.fire('Registro Actualizado', 'El registro se ha actualizado correctamente', 'success');
    return true;
  }));
}
crearElemento( persona: Persona, idAgente: string) {
  const url = URL_SERVICIOS + '/clientes/guardar-cliente/' + idAgente;
  return this.http.post( url, persona )
    .pipe(map( (resp: any) => {
      swal.fire('Elemento creado exitósamente', '' + persona.nombre + '', 'success');
      return resp.usuario;
    }), catchError(err => {
      swal.fire(err.error.mensaje,  'Ha ocurrido un error', 'error');
      return Observable.throw(err);
    }));
  }
  borrar(obj: any) {
    console.log(obj);
    const url = URL_SERVICIOS + '/clientes/eliminar-cliente';
    return this.http.post(url, obj)
    .pipe(map((resp: any) => {
      swal.fire('Registro eliminado', 'El registro se ha eliminado correctamente', 'success');
      return true;
    }));
  }
}
