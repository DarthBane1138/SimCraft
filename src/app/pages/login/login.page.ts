import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  // Declaración de variables

  // Variables de Usuario actuales
  user: string = '';
  pass: string = '';
  mail: string = '';
  location: string = '';

  // Variables ingresadas a Inputs
  mdl_user: string = '';
  mdl_pass: string = '';
  mdl_mail: string = '';
  // Booleano para estado de spinner (cosito de "cargando")
  spinnervisible: boolean=false;
  // Booleano para manejar estado de Toast
  isToastOpen=false;
  // Duración Toast
  duration: number=3000;
  // Mensaje entregado en Toast
  message: string = 'Credenciales incorrectas, intente de nuevo';
  

  constructor(private router:Router) { 
  }
 
  // OnInit, se reciben variables desde Home (en caso de cambio de contraseña) o desde Registro de Usuario
  ngOnInit() {
    let extras =this.router.getCurrentNavigation()?.extras; //el ? es una proteccion contra valores nulos, lo que evita que las paginas se caigan derepente
    if(extras?.state){
      this.user = extras?.state["user"]; //if de existencias, permite 
      this.pass = extras?.state["pass"];
      this.mail = extras?.state["mail"];
      this.location = extras?.state["location"];
    } else {
      this.user = 'admin';
      this.pass = 'admin';
      this.mail = 'admin@duocuc.cl';
      this.location = 'Padre Alonso Ovalle';
    }
    console.log("----- Variables heredadas -----")
    console.log("Nombre usuario: " + this.user);
    console.log("Contraseña nueva: " + this.pass);
    console.log("Corrreo: " + this.mail);
    console.log("Sede: " + this.location);
  }
  
  // Función ligada a botón de Login
  login(){
    this.spinnervisible=true;
    //navegacion con parametros 
    let extras: NavigationExtras ={
      state: {
        "user": this.user,
        "pass": this.pass,
        "mail": this.mail,
        "location": this.location,
      },
      replaceUrl: true
    }

    console.log("Usuario/Correo ingresado: " + this.mdl_user)
    console.log("Contraseña ingresada: " + this.mdl_pass)

    setTimeout(() => {
      if ((this.mdl_user === this.user || this.mdl_user === this.mail) && this.mdl_pass === this.pass){
        this.router.navigate(['home'], extras);
      } else{
        this.isToastOpen=true;
      }
      this.spinnervisible=false;
    }, 2000);
    
  }

  // Función para abrir Toast
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  // Redirección a Registro de Usuario
  signup() {
    let extras: NavigationExtras = {
      state: {
        "user": this.user,
        "pass": this.pass,
        "mail": this.mail,
        "location": this.location,
      },
      replaceUrl: true
    };
    this.router.navigate(['sign-up'], extras);
  }
}
