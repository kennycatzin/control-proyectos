import { Component, OnInit } from '@angular/core';
declare function init_plugins();

@Component({
  selector: 'app-cuentasxpagar',
  templateUrl: './cuentasxpagar.component.html',
  styles: []
})
export class CuentasxpagarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
