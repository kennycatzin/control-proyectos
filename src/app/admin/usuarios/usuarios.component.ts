import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { Router } from '@angular/router';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  forma: FormGroup;
  titularAlerta = '';
  durationInSeconds = 5;
  constructor( public usuarioService: UsuarioService,
               public router: Router
    ) { }

  sonIguales( campo1: string, campo2: string) {
    return ( group: FormGroup ) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      if (pass1 === pass2) {
        return null;
      }
      return {
      sonIguales: true
      };
    };

  }

  ngOnInit() {
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required)
    }, { validators: this.sonIguales( 'password', 'password2' ) });
    this.forma.setValue({
      nombre: 'test',
      email: 'test@test.com',
      password: '123456',
      password2: '123456'
    });
  }

  guardar() {
    if (this.forma.invalid ) {
      // swal.fire('Registro exitoso...', 'dasd', 'warning');
      console.log('mal');
      return;
    }
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password
    );
    this.usuarioService.crearUsuario(usuario)
    .subscribe(resp => this.router.navigate(['/solicitudes']));
    console.log('Forma válida: ' + this.forma.valid);
    console.log(this.forma.value);
  }

}
