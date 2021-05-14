import { Component, OnInit } from '@angular/core';
declare function init_plugins();

@Component({
  selector: 'app-proyectosddp',
  templateUrl: './proyectosddp.component.html',
  styles: []
})
export class ProyectosddpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
