import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  constructor(public http: HttpClient) { }

  getBitacoraPendientes(index: number = 0) {
    const url = URL_SERVICIOS + '/bitacora/get-bitacora-pendientes/' + index;
    return this.http.get(url);
  }
  getBitacoraCompromisos(index: number = 0) {
    const url = URL_SERVICIOS + '/bitacora/get-bitacora-compromisos/'+ index;
    return this.http.get(url);
  }
  getPendientesDia(fecha: string = "", nombre: string = ""){
    const objeto = {
      "fecha": fecha, 
      "nombre": nombre
    }
    const url = URL_SERVICIOS + '/bitacora/get-pendientes-dia';
    return this.http.post(url, objeto)
            .pipe(map((resp: any) => resp.data));  
  }
  getPendientesPeriodo(fechaInicial: string = "", fechaFinal: string = "", nombre: string = ""){
    const objeto = {
      "fechaInicial": fechaInicial,
      "fechaFinal": fechaFinal, 
      "nombre": nombre
    }
    const url = URL_SERVICIOS + '/bitacora/get-pendientes-periodo';
    return this.http.post(url, objeto)
            .pipe(map((resp: any) => resp.data));  
  }
  getCompromisosDia(fecha: string = "", nombre: string = ""){
    const objeto = {
      "fecha": fecha, 
      "nombre": nombre
    }
    const url = URL_SERVICIOS + '/bitacora/get-compromisos-dia';
    return this.http.post(url, objeto)
            .pipe(map((resp: any) => resp.data));  
  }
  getCompromisosPeriodo(fechaInicial: string = "", fechaFinal: string = "", nombre: string = ""){
    const objeto = {
      "fechaInicial": fechaInicial,
      "fechaFinal": fechaFinal, 
      "nombre": nombre
    }
    const url = URL_SERVICIOS + '/bitacora/get-compromisos-periodo';
    return this.http.post(url, objeto)
            .pipe(map((resp: any) => resp.data));  
  }

  
}
