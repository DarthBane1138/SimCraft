import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})

export class SignUpPage implements OnInit {

  mdl_new_user: string = '';
  mdl_new_pass: string = '';
  mdl_conf_pass: string = '';
  mdl_email: string = '';
  spinnervisible: boolean = false;

  constructor(private router:Router) { }

  ngOnInit() {
    console.log("Bienvenido al registro de usuario")
  }

  registrar() {
    this.spinnervisible = true;
    let extras: NavigationExtras = {
      state: {
        "user": this.mdl_new_user,
        "pass": this.mdl_new_pass,
      }
    }
    setTimeout(() => {
      if(this.mdl_new_user && this.mdl_new_pass && this.mdl_email && this.mdl_conf_pass) {
        // Acá irán las condiciones para aceptar el registro de usuario
        this.router.navigate(['login'], extras)
      } else {

      }
    }, 1000)
  }

  inicio(){
    this.router.navigate(['login']);
  }

}
