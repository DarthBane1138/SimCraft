import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: string = '';
  pass: string = '';

  mdl_user: string = '';
  mdl_pass: string = '';
  //warningVisible: boolean = false;
  spinnervisible: boolean=false;
  isToastOpen=false;
  duration: number=3000;
  message: string='Credenciales incorrectas, intente de nuevo';

  constructor(private router:Router) { 

  }
 
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
  
  login(){
    this.spinnervisible=true;
    //this.warningVisible=false;
    //navegacion con parametros 
    let extras: NavigationExtras ={ //el state es el estado en el que va a viajar el parametro
      state: {
        "user": this.mdl_user,
        "pass": this.mdl_pass,
      },
      replaceUrl: true //reemplazo de url (navegacion previa se olvida y se borra)
    }
    setTimeout(() => {
      if(this.mdl_user == this.user && this.mdl_pass == this.pass){
        this.router.navigate(['home'], extras);
      }
      else{
        //this.warningVisible=true;
        this.isToastOpen=true; //alerta evento credenciales incorrectass
      }
      this.spinnervisible=false;
    }, 2000);
    
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  signup() {
    this.router.navigate(['sign-up'],{replaceUrl:true})
  }
}
