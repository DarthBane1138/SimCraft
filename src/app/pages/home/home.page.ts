import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // Declaración de variables de usuario y contraseña
  user: string='';
  pass: string='';
  // Mensaje cambio de contraseña
  message = '';
  // Variables de cambio de contraseña (en modal)
  current_pass: string="";
  new_pass: string="";
  confirm_pass: string="";

  constructor(private router:Router) {}

  // Recepción de varibales desde login
  ngOnInit() {
    let extras =this.router.getCurrentNavigation()?.extras;
    if(extras?.state){
      this.user= extras?.state["user"];
      this.pass= extras?.state["pass"];
    }
  console.log("Nombre usuario: " + this.user);
  console.log("Contraseña: " + this.pass);
  }

  // @ViewChild es un decorador que permite acceder a un elemento del DOM o a un componente hijo en plantilla
  // desde componente Typescript, acá se usa para obtener una referencia a un componenten 'IonModal'
  @ViewChild(IonModal)
  // Acá se define una propiedad llamada 'modal' de tipo 'IonModal'. El operador ! se llama "non-null assertion operrator"
  // Se usa para decirle a Typescript que confíe en que esta variable será inicializada y no será 'null' o 'undefined'
  // en tiempo de ejecución
  modal!: IonModal;

  // Botón para cancelar cambio de contraseña
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  // Función para cerrar modal al canelar cambvio de contraseña
  confirm() {
    this.modal.dismiss(this.current_pass, 'confirm');
  }

  // Función para cerrar modal pero confirmados los datos de cambio de contraseña
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Felicidades, ${ev.detail.data} has cambiado tu contraseña`;
    }
  }

  // Función para cambio de contraseña
  change_pass () {
    let extras: NavigationExtras ={ //el state es el estado en el que va a viajar el parametro
      state: {
        "user": this.user,
        "pass": this.new_pass,
      },
    }

    if(this.current_pass == this.pass){
      console.log("Tu contraseña actual es correcta")
      if(this.confirm_pass == '' && this.new_pass == ''){
        console.log("Ingresa una contraseña")
      }else if(this.new_pass == this.confirm_pass) {
        console.log("Confirmación correcta de contraseña nueva")
        this.pass = this.new_pass;
        console.log("Nombre usuario: " + this.user);
        console.log("Contraseña nueva: " + this.pass);
        this.router.navigate(['login'], extras)
        this.modal.dismiss(this.current_pass, 'confirm');
      } else {
      console.log("Confirmación de constraseña incorrecta")
      }
      console.log("Nombre usuario: " + this.user);
      console.log("Contraseña nueva: " + this.pass);
    }
  }

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
}