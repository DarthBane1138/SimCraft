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

  // Variables ingresadas a Inputs
  mdl_user: string = '';
  mdl_pass: string = '';
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
      this.user= extras?.state["user"]; //if de existencias, permite 
      this.pass= extras?.state["pass"];
    } else {
      this.user = 'admin';
      this.pass = 'admin';
    }
    console.log("Variables heredadas")
    console.log("Nombre usuario: " + this.user);
    console.log("Contraseña nueva: " + this.pass);
  }
  
  // Función ligada a botón de Login
  login(){
    this.spinnervisible=true;
    //navegacion con parametros 
    let extras: NavigationExtras ={
      state: {
        "user": this.mdl_user,
        "pass": this.mdl_pass,
      },
      replaceUrl: true
    }
    setTimeout(() => {
      if(this.mdl_user == this.user && this.mdl_pass == this.pass){
        this.router.navigate(['reset-password'], extras);
      }
      else{
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
    this.router.navigate(['sign-up'],{replaceUrl:true})
  }
}
