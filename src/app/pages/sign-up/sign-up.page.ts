import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})

export class SignUpPage implements OnInit {

  // Declaración de Variables

  // Variables de Usuarui actuales
  user: string = '';
  pass: string = '';
  mail: string = '';
  location: string = '';

  // Variables para creación de nuevos usuarios
  mdl_new_user: string = '';
  mdl_new_pass: string = '';
  mdl_conf_pass: string = '';
  mdl_email: string = '';
  mdl_location: string = '';

  errorCorreo: string='';
  errorUser: string='';
  errorConfirmPass: string='';
  errorPass: string='';
  sede: string='';
  // Booleano para manejar cosito de carga
  spinnervisible: boolean = false;
  // Booleano para alerta
  isAlertOpen = false;
  alertButtons = ['OK'];

  constructor(private router:Router) { }

  ngOnInit() {
    console.log("Bienvenido al registro de usuario")
    let extras = this.router.getCurrentNavigation()?.extras;
    if(extras?.state){
      this.user = extras?.state["user"];
      this.pass = extras?.state["pass"];
      this.mail = extras?.state["mail"];
      this.location = extras?.state["location"];
    }
  }

  // Función de botón de registro
  registrar() {
    this.spinnervisible = true;
    this.errorCorreo = '';
    this.errorUser = '';
    this.errorConfirmPass= '';
    this.errorPass= '';
    this.sede = '';

    const emailDuoc = /^[a-zA-Z0-9._%+-]+@duocuc\.cl$/; //Regex para el correo
    let validacion = false;
    
     //validando los vacios
    if(!this.mdl_new_user){
      this.errorUser = '* El campo es obligatorio';
      validacion = true;
    }
    if(!this.mdl_new_pass){
      this.errorPass = '* El campo es obligatorio';
      validacion = true;
    }
    if(!this.mdl_location){
      this.sede = '* El campo es obligatorio';
      validacion = true;
    }
    //validando el correo
    if(!this.mdl_email){
      this.errorCorreo = '* El correo es obligatorio';
      validacion = true;
    }else if(!emailDuoc.test(this.mdl_email)){
      this.errorCorreo = 'El correo institucional debe llevar nuestro dominio (@duocuc.cl)';
      validacion = true;
    }

    //confirmacion de la password
    if(this.mdl_conf_pass == ''){
      this.errorConfirmPass = '* El campo es obligatorio';
      validacion = true;
    }else if(this.mdl_new_pass !== this.mdl_conf_pass){
      this.errorConfirmPass = 'Las contraseñas no coinciden';
      validacion = true;
    }

    if (validacion) {
      this.spinnervisible = false;
      return;
    }
        
    this.isAlertOpen = true;


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
      this.isAlertOpen = false;
    }, 3000); 

    setTimeout(() => {
        this.router.navigate(['login'], extras)
    }, 3000);
  }

  // Botón para volver al inicio
  inicio(){
    let extras: NavigationExtras = {
      state: {
        "user": this.user,
        "pass": this.pass,
        "mail": this.mail,
        "location": this.location,
      },
      replaceUrl: true
    }
    this.router.navigate(['login'], extras);
  }
  
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  
}
