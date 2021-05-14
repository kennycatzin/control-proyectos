import { Component, OnInit } from '@angular/core';
import { BitacoraService } from 'src/app/services/bitacora/bitacora.service';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-bitacora-compromiso',
  templateUrl: './bitacora-compromiso.component.html',
  styleUrls: ['./bitacora-compromiso.component.css']
})
export class BitacoraCompromisoComponent implements OnInit {

  constructor(public bitacoraService: BitacoraService) { }
  cargando = false;
  periodoDia = false;
  obj: any[];
  fileName= 'ExcelSheet.xlsx'; 
  desde = 0; 
  dia = true;
  periodo = false;
  totalRegistros = 0;
  fecha: string = "";
  fechaInicial: string = "";
  fechaFinal: string = "";
  nombre: string = "";
  observacion: string = "";
  paginado = true;
  ngOnInit() {
    this.getDatos();
  }
  getDatos(){
    this.cargando = true;
    this.bitacoraService.getBitacoraCompromisos(this.desde)
      .subscribe( (data: any) => {
        this.obj = data.data;
        this.totalRegistros = data.numero;

        this.cargando = false;
      });
  }
  cambiarDesde(numero: number) {
    const desde = this.desde + numero;
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0 ) {
      return;
    }
    this.desde += numero;
    this.getDatos();
  }
  exportexcel(): void 
  {
     /* table id is passed over here */   
     let element = document.getElementById('bitPendientes'); 
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, this.fileName);
    
  }
  cambioFechas(evt){
    var target = evt.target.value;
    if(target == "dia"){
      this.dia = true;
      this.periodo = false;
    }else if(target == "periodo"){
      this.dia = false;
      this.periodo = true;
    }
  }
  buscar(){
    if(this.dia){
      if(this.fecha == "" && this.nombre == ""){
        return;
      }
      this.cargando = true;
      this.bitacoraService.getCompromisosDia(this.fecha, this.nombre)
        .subscribe( (data: any) => {
          this.paginado = false;
          this.obj = data;
          this.cargando = false;
      });
    }
    if(this.periodo){
      if(this.fechaInicial == "" && this.fechaFinal == "" && this.nombre == ""){
        return
      }
      this.cargando = true;
      this.bitacoraService.getCompromisosPeriodo(this.fechaInicial, this.fechaFinal, this.nombre)
        .subscribe( (data: any) => {
          this.paginado = false;
          this.obj = data;
          this.cargando = false;
      });
    }
  }
  verObservacion(observacion){
    this.observacion = observacion.descripcion;
  }
}
