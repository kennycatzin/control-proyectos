import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Clasificacion } from '../../models/clasificacion.model';
import { URL_SERVICIOS } from 'src/config/config';


@Injectable({
  providedIn: 'root'
})
export class ClasificacionService {
    clasificacion: Clasificacion;
  token: string;
  constructor(public http: HttpClient
            ) {
  }


  getClasificacion( desde: Number = 0) {
    let url = URL_SERVICIOS + '/api/clasificaciones?desde=' + desde;
    return this.http.get(url);
  }
  getClasificacionMuscular( desde: Number = 0) {
    let url = URL_SERVICIOS + '/api/clasificaciones/muscular?desde=' + desde;
    return this.http.get(url);
  }
  getClasificacionAlimentacion( desde: Number = 0) {
    let url = URL_SERVICIOS + '/api/clasificaciones/alimentacion?desde=' + desde;
    return this.http.get(url);
  }
  crearClasificacion(clasificacion: Clasificacion) {
    let url = URL_SERVICIOS + '/api/clasificacion';
    console.log(clasificacion);
    return this.http.post( url, clasificacion )
      .pipe(map( (resp: any) => {
        swal.fire('Elemento creada exitósamente', '' , 'success');
        return resp.data;
      }));
    }

    borrar(id: string) {
      let url = URL_SERVICIOS + '/api/clasificacion/' + id;
      return this.http.delete(url)
      .pipe(map((resp: any) => {
        swal.fire('Registro eliminado', 'El registro se ha eliminado correctamente', 'success');
        return true;
      }));
    }
    actualizar(id: string, clasificacion: Clasificacion) {
      let url = URL_SERVICIOS + '/api/clasificacion' + id;
      return this.http.put(url, clasificacion)
      .pipe(map((resp: any) => {
        swal.fire('Registro Actualizado', 'El registro se ha actualizado correctamente', 'success');
        return true;
      }));
    }
}

