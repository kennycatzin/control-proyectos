import { BitacoraService } from './../../services/bitacora/bitacora.service';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-bitacora-pendiente',
  templateUrl: './bitacora-pendiente.component.html',
  styleUrls: ['./bitacora-pendiente.component.css']
})
export class BitacoraPendienteComponent implements OnInit {

  constructor(public bitacoraService: BitacoraService) { }
  cargando = false;
  periodoDia = false;
  obj: any[];
  desde = 0;
  fileName= 'ExcelSheet.xlsx';  
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
    this.bitacoraService.getBitacoraPendientes(this.desde)
      .subscribe( (data: any) => {
        this.totalRegistros = data.numero;
        this.paginado = true;
        this.obj = data.data;
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
      this.bitacoraService.getPendientesDia(this.fecha, this.nombre)
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
      this.bitacoraService.getPendientesPeriodo(this.fechaInicial, this.fechaFinal, this.nombre)
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
