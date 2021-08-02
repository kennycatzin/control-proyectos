import { Component, OnInit } from '@angular/core';
declare function init_plugins();

@Component({
  selector: 'app-proyectosddp',
  templateUrl: './seguros-web.component.html',
  styles: []
})
export class SegurosWebComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
