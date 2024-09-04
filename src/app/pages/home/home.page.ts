import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // Variables de Usuario actuales
  user: string = '';
  pass: string = '';

  ngOnInit() {
    let extras =this.router.getCurrentNavigation()?.extras;
    if(extras?.state){
      this.user= extras?.state["user"];
      this.pass= extras?.state["pass"];
    }
  console.log("Nombre usuario: " + this.user);
  console.log("Contraseña: " + this.pass);
  }

  constructor(private router:Router) {}

    // Función para cerrar sesión
    cerrarSesion(){
      let extras: NavigationExtras ={ //el state es el estado en el que va a viajar el parametro
        state: {
          "user": this.user,
          "pass": this.pass,
        },
        replaceUrl: true
      }
      this.router.navigate(['login'],extras)
    }

  irResetPassword() {
    let extras: NavigationExtras ={ //el state es el estado en el que va a viajar el parametro
      state: {
        "user": this.user,
        "pass": this.pass,
      },
      replaceUrl: true
    }
    this.router.navigate(['reset-password'],extras)
  }

  irHome() {
    let extras: NavigationExtras ={ //el state es el estado en el que va a viajar el parametro
      state: {
        "user": this.user,
        "pass": this.pass,
      },
      replaceUrl: true
    }
    this.router.navigate(['home'],extras)
  }
}