import { Compromiso } from './../../models/compromiso.model';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { SubirArchivoService } from '../archivos/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class CompromisoService {

  constructor(public http: HttpClient,
              public subirArchivo: SubirArchivoService) { }


  crearElemento(compromiso: Compromiso, archivo: File) {
    const url = URL_SERVICIOS + '/compromiso/guardar-compromiso';
    return this.http.post( url, compromiso )
      .pipe(map( (resp: any) => {
        if(archivo != null){
          this.cambiarImagen(archivo, resp.id_compromiso);
        }
        swal.fire('Elemento creada exitósamente', '' , 'success');
        return resp.data;
      }));
    }
    actualizar(id: number, compromiso: Compromiso, archivo: File) {
      const url = URL_SERVICIOS + '/compromiso/editar-compromiso';
      return this.http.post(url, compromiso)
      .pipe(map((resp: any) => {
        if(archivo != null){
          this.cambiarImagen(archivo, id);
        }
        swal.fire('Registro Actualizado', 'El registro se ha actualizado correctamente', 'success');
        return resp;
      }));
    }
    borrar(obj: any) {
      const url = URL_SERVICIOS + '/compromiso/baja-compromiso';
      return this.http.put(url, obj)
      .pipe(map((resp: any) => {
        swal.fire('Registro eliminado', 'El registro se ha eliminado correctamente', 'success');
        return true;
      }));
    }
    guardarObservacion(obj: any) {
      const url = URL_SERVICIOS + '/compromiso/guardar-observacion';
      return this.http.post( url, obj )
        .pipe(map( (resp: any) => {
          swal.fire('Elemento creada exitósamente', '' , 'success');
          return resp.data;
        }));
      }
      cambiarImagen(archivo: File, id: number) {
        this.subirArchivo.subirArchivo(archivo, 'compromiso', id)
        .then( (resp: any) => {
         // swal.fire('Operación exitosa', '' + resp.data + '', 'success');
        })
        .catch( (resp: any) => {
         // swal.fire('Operación correcta', '', 'success');
        });
      }

      getCompromisoPendiente( id_pendiente: number = 0) {
        const url = URL_SERVICIOS + '/compromiso/get-compromisos-pendiente/' + id_pendiente;
        return this.http.get(url);
      }
      getDataCompromiso( id_pendiente: number, id_status: number, nombre: string ) {
        const objeto = {
          "nombre": nombre,
          "id_pendiente": id_pendiente,
          "id_status": id_status
        }
        let url = URL_SERVICIOS + '/compromiso/get-compromisos-pendiente';
        return this.http.post(url, objeto)
                .pipe(map((resp: any) => resp));
      }

}
