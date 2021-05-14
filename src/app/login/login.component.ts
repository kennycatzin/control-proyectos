import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
declare function init_plugins();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  recuerdame = false;
  constructor(public router: Router,
              public usuarioService: UsuarioService
    ) { }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1 ) {
      this.recuerdame = true;
    }
  }
ingresar( forma: NgForm ) {
  if (forma.invalid) {
    return;
  }
  let usuario = new Usuario(forma.value.email, forma.value.email, forma.value.password, 0, "");
  this.usuarioService.login( usuario, forma.value.recuerdame )
        .subscribe( data => {
          this.router.navigate(['/inicio']);

        }
          
      );
  // this.router.navigate['/inicio'];
}
ingreso() {
  this.router.navigate(['/inicio']);
}
}
