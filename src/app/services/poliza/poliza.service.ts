import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/config/config';
import swal from 'sweetalert2';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class PolizaService {

  constructor(public http: HttpClient,
    public router: Router) { }

  obtenerPolizas(idAgente   ,desde: number = 0) {
    const url = URL_SERVICIOS + '/polizas/get-polizas/'+idAgente + '/' + desde;
    return this.http.get(url);
}
borrar(obj: any) {
  console.log(obj);
  const url = URL_SERVICIOS + '/polizas/eliminar-poliza';
  return this.http.post(url, obj)
  .pipe(map((resp: any) => {
    swal.fire('Registro eliminado', 'El registro se ha eliminado correctamente', 'success');
    return true;
  }));
}
crearElemento( obj: any, idAgente: string) {
  const url = URL_SERVICIOS + '/polizas/guardar-cliente';
  return this.http.post( url, obj )
    .pipe(map( (resp: any) => {
      swal.fire('Elemento creado exitósamente', '' + obj.aseguradora + '', 'success');
      return resp.usuario;
    }), catchError(err => {
      swal.fire(err.error.mensaje,  'Ha ocurrido un error', 'error');
      return Observable.throw(err);
    }));
  }

}
