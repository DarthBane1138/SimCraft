import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // Declaración de variables de usuario y contraseña
  user: string = '';
  pass: string = '';
  mail: string = '';
  location: string = '';
  // Mensaje cambio de contraseña
  message = '';

  constructor(private router:Router) {}

  // Recepción de varibales desde login
  ngOnInit() {
    let extras =this.router.getCurrentNavigation()?.extras;
    if(extras?.state){
      this.user = extras?.state["user"];
      this.pass = extras?.state["pass"];
      this.mail = extras?.state["mail"];
      this.location = extras?.state["location"];
    }
  console.log("Nombre usuario: " + this.user);
  console.log("Contraseña: " + this.pass);
  console.log("Correo: " + this.mail);
  console.log("Sede: " + this.location)
  }

  // Función para cerrar sesión
  cerrarSesion(){
    let extras: NavigationExtras ={
      state: {
        "user": this.user,
        "pass": this.pass,
        "mail": this.mail,
        "location": this.location,
      },
      replaceUrl: true
    }
    this.router.navigate(['login'],extras)
  }

  irHome() {
    let extras: NavigationExtras ={ //el state es el estado en el que va a viajar el parametro
      state: {
        "user": this.user,
        "pass": this.pass,
        "mail": this.mail,
        "location": this.location,
      },
      replaceUrl: true
    }
    this.router.navigate(['home'],extras)
  }

  irResetPassword() {
    let extras: NavigationExtras ={ //el state es el estado en el que va a viajar el parametro
      state: {
        "user": this.user,
        "pass": this.pass,
        "mail": this.mail,
        "location": this.location,
      },
      replaceUrl: true
    }
    this.router.navigate(['reset-password'],extras)
  }

}