import { Injectable } from '@angular/core';
import { Pendiente } from 'src/app/models/pendiente.model';
import { URL_SERVICIOS } from 'src/config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { SubirArchivoService } from '../archivos/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class PendienteService {

  constructor(public http: HttpClient,
              public subirArchivo: SubirArchivoService) { }


  crearElemento(pendiente: Pendiente, archivo: File) {
    const url = URL_SERVICIOS + '/pendiente/guardar-pendiente';
    return this.http.post( url, pendiente )
      .pipe(map( (resp: any) => {
        if(archivo != null){
          this.cambiarImagen(archivo, resp.id_pendiente);
        }
        swal.fire('Elemento creada exitósamente', '' , 'success');
        return resp.data;
      }));
    }
    cambiarImagen(archivo: File, id: number) {
      this.subirArchivo.subirArchivo(archivo, 'pendiente', id)
      .then( (resp: any) => {
        swal.fire('Operación exitosa', '' + resp.data + '', 'success');
      })
      .catch( (resp: any) => {
        swal.fire('Operación correcta', '', 'success');
      });
    }
    actualizar(id: number, pendiente: Pendiente, archivo: File) {
      const url = URL_SERVICIOS + '/pendiente/editar-pendiente';
      return this.http.post(url, pendiente)
      .pipe(map((resp: any) => {
        if(archivo != null){
            this.cambiarImagen(archivo, id);
        }
        swal.fire('Registro Actualizado', 'El registro se ha actualizado correctamente', 'success');
        return resp;
      }));
    }
    borrar(obj: any) {
      const url = URL_SERVICIOS + '/pendiente/baja-pendiente';
      return this.http.put(url, obj)
      .pipe(map((resp: any) => {
        swal.fire('Registro eliminado', 'El registro se ha eliminado correctamente', 'success');
        return true;
      }));
    }
    guardarObservacion(obj: any) {
      const url = URL_SERVICIOS + '/pendiente/guardar-observacion';
      return this.http.post( url, obj )
        .pipe(map( (resp: any) => {
          swal.fire('Elemento creada exitósamente', '' , 'success');
          return resp.data;
        }));
      }

    getPendientesPaginacion( desde: number = 0) {
      const url = URL_SERVICIOS + '/pendiente/get-pendientes/' + desde;
      return this.http.get(url);
    }
    getPorEstatus( id_status: number = 0, nombre: string = "") {
      const objeto = {
        "nombre": nombre,
        "id_status": id_status
      }
      const url = URL_SERVICIOS + '/pendiente/get-por-estatus';
      return this.http.post(url, objeto)
              .pipe(map((resp: any) => 
                resp)
              );
    }

    getInfoPendiente( id_pendiente: number = 0) {
      const url = URL_SERVICIOS + '/pendiente/get-info-pendiente/' + id_pendiente;
      return this.http.get(url);
    }

    busqueda( nombre: string ) {
        const objeto = {
          "buscador": nombre
        }
        let url = URL_SERVICIOS + '/pendiente/busqueda';
        return this.http.post(url, objeto)
                .pipe(map((resp: any) => resp.data));
      }
  
}
