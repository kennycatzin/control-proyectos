import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Pasiente } from '../../models/pasiente.model';
import { URL_SERVICIOS } from 'src/config/config';
@Injectable({
  providedIn: 'root'
})
export class PasienteService {
  pasiente: Pasiente;
  token: string;
  constructor(public http: HttpClient)
  {}
  getPasientesPaginacion( desde: Number = 0) {
    let url = URL_SERVICIOS + '/api/pasientes/paginacion/' + desde;
    return this.http.get(url);
  }

  crearPasientes(pasiente: Pasiente) {
    let url = URL_SERVICIOS + '/api/pasientes';
    console.log(pasiente);
    return this.http.post( url, pasiente )
      .pipe(map( (resp: any) => {
        swal.fire('Elemento creada exitósamente', '' , 'success');
        return resp.data;
      }));
    }

    borrar(id: number) {
      let url = URL_SERVICIOS + '/api/pasientes/' + id;
      return this.http.delete(url)
      .pipe(map((resp: any) => {
        swal.fire('Registro eliminado', 'El registro se ha eliminado correctamente', 'success');
        return true;
      }));
    }
    actualizar(id: number, pasiente: Pasiente) {
      let url = URL_SERVICIOS + '/api/pasientes/' + id;
      return this.http.put(url, pasiente)
      .pipe(map((resp: any) => {
        swal.fire('Registro Actualizado', 'El registro se ha actualizado correctamente', 'success');
        return true;
      }));
    }
    busqueda( nombre: string ) {
      let url = URL_SERVICIOS + '/api/pasientes/busqueda/' + nombre;
      return this.http.get(url)
              .pipe(map((resp: any) => resp.data));
    }
}
