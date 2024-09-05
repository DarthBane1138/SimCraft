import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})

export class SignUpPage implements OnInit {

  // Declaración de Variables

  // Variables para creación de nuevos usuarios
  mdl_new_user: string = '';
  mdl_new_pass: string = '';
  mdl_conf_pass: string = '';
  mdl_email: string = '';
  mdl_location: string = '';
  // Booleano para manejar cosito de carga
  spinnervisible: boolean = false;

  constructor(private router:Router) { }

  ngOnInit() {
    console.log("Bienvenido al registro de usuario")
  }

  // Función de botón de registro
  registrar() {
    this.spinnervisible = true;
    let extras: NavigationExtras = {
      state: {
        "user": this.mdl_new_user,
        "pass": this.mdl_new_pass,
        "mail": this.mdl_email,
        "location": this.mdl_location,
      },
      replaceUrl: true
    }
    setTimeout(() => {
      if(this.mdl_new_user && this.mdl_new_pass && this.mdl_email && this.mdl_conf_pass) {
        // Acá irán las condiciones para aceptar el registro de usuario
        this.router.navigate(['login'], extras)
      } else {

      }
    }, 1000)
  }

  // Botón para volver al inicio
  inicio(){
    this.router.navigate(['login']);
  }
  
}
