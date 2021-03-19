import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Alimento } from '../../models/alimento.model';
import { URL_SERVICIOS } from 'src/config/config';



@Injectable({
  providedIn: 'root'
})
export class AlimentoService {
  alimento: Alimento;
  token: string;
  constructor(public http: HttpClient
            ) {
  }


  getAlimentoPaginacion( desde: number = 0) {
    const url = URL_SERVICIOS + '/api/alimentos/paginacion/' + desde;
    return this.http.get(url);
  }

  crearAlimento(alimento: Alimento) {
    const url = URL_SERVICIOS + '/aspi/alimentos';
    console.log(alimento);
    return this.http.post( url, alimento )
      .pipe(map( (resp: any) => {
        swal.fire('Elemento creada exitósamente', '' , 'success');
        return resp.data;
      }));
    }

    borrar(id: number) {
      const url = URL_SERVICIOS + '/api/alimentos/' + id;
      return this.http.delete(url)
      .pipe(map((resp: any) => {
        swal.fire('Registro eliminado', 'El registro se ha eliminado correctamente', 'success');
        return true;
      }));
    }
    actualizar(id: number, alimento: Alimento) {
      const url = URL_SERVICIOS + '/api/alimentos/' + id;
      return this.http.put(url, alimento)
      .pipe(map((resp: any) => {
        swal.fire('Registro Actualizado', 'El registro se ha actualizado correctamente', 'success');
        return true;
      }));
    }
    busqueda( nombre: string ) {
      const url = URL_SERVICIOS + '/api/alimentos/busqueda/' + nombre;
      return this.http.get(url)
              .pipe(map((resp: any) => resp.data));
    }
}

