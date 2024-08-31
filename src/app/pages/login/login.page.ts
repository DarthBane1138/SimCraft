import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mdl_user: string = '';
  mdl_pass: string = '';
  //warningVisible: boolean = false;
  spinnervisible: boolean=false;
  isToastOpen=false;
  duration: number=3000;
  message: string='Credenciales incorrectas, intente de nuevo';

  constructor(private router:Router) { 

  }
  user2: string='';
  pass2: string='';
  ngOnInit() {
    let extras =this.router.getCurrentNavigation()?.extras; //el ? es una proteccion contra valores nulos, lo que evita que las paginas se caigan derepente
    if(extras?.state){
      this.user2= extras?.state["changed_user"]; //if de existencias, permite 
      this.pass2= extras?.state["changed_pass"];
    }
  }
  login(){
    this.spinnervisible=true;
    //this.warningVisible=false;
    //navegacion con parametros 
    let extras: NavigationExtras ={ //el state es el estado en el que va a viajar el parametro
      state: {
        "usuario": this.mdl_user,
        "password": this.mdl_pass,
        "msg": "messagge"
      },
      replaceUrl: true //reemplazo de url (navegacion previa se olvida y se borra)
    }
    setTimeout(() => {
      if(this.mdl_user == 'admin' && this.mdl_pass=='admin'){
        this.router.navigate(['home'], extras);
      } else if (this.user2 == this.user2 && this.pass2 == this.pass2) {
        this.router.navigate(['home'], extras);
      }
      else{
        //this.warningVisible=true;
        this.isToastOpen=true; //alerta evento credenciales incorrectass
      }
      this.spinnervisible=false;
    }, 3000);
  }
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

}
