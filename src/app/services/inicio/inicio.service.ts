import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  constructor(public http: HttpClient) { }

  getTablero( tipo: number = 0) {
    const url = URL_SERVICIOS + '/inicio/get-tablero/' + tipo;
    return this.http.get(url);
  }
}
