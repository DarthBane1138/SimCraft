import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AlertController } from '@ionic/angular';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  

  // Declaración de variables de usuario y contraseña
  user: string='';
  pass: string='';
  mail: string = '';
  location: string = '';
  // Mensaje cambio de contraseña
  message = '';
  errorConfirmPass: string= '';
  errorNewPass: string= '';
  errorCurrentPass: string = ''
  // Variables de cambio de contraseña (en modal)
  current_pass: string="";
  new_pass: string="";
  confirm_pass: string="";
  // Variable Alerta
  isAlertOpen = false;
  alertButtons = ['Cerrar'] //alerta de cerrar sesion desde modal

  constructor(private router:Router, private alertController: AlertController) {}

  @ViewChild(IonModal) modal!: IonModal;

  // Recepción de varibales desde login
  ngOnInit() {
    let extras =this.router.getCurrentNavigation()?.extras;
    if(extras?.state){
      this.user= extras?.state["user"];
      this.pass= extras?.state["pass"];
      this.mail = extras?.state["mail"];
      this.location = extras?.state["location"];
    }
  console.log("Nombre usuario: " + this.user);
  console.log("Contraseña: " + this.pass);
  console.log("Correo: " + this.mail);
  console.log("Sede: " + this.location);
  }

  //ngAfterViewInit() {
  //  console.log(this.modal);
  //  this.modal.present(); // Intenta abrir el modal manualmente
  //}

  openModal() {
    console.log("Me has presionado")
    this.modal.present(); // Abre el modal manualmente
  }

  // Botón para cancelar cambio de contraseña
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  // Función para cerrar modal al canelar cambio de contraseña
  confirm() {
    let extras: NavigationExtras ={ //el state es el estado en el que va a viajar el parametro
      state: {
        "user": this.user,
        "pass": this.new_pass,
        "mail": this.mail,
        "location": this.location,
      },
    }

    setTimeout(() => {
      this.modal.dismiss(this.current_pass, 'confirm')
      this.router.navigate(['login'], extras)
    }, 2000);
  }

  // Función para cerrar modal pero confirmados los datos de cambio de contraseña
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Felicidades, ${ev.detail.data} has cambiado tu contraseña`;
      //this.setOpen(false);
    }
  }

  // Función para cambio de contraseña
  change_pass () {
    this.errorConfirmPass = '';
    this.errorNewPass = '';
    this.errorCurrentPass = '';
    let validacion = false;

    if(!this.current_pass){
      this.errorCurrentPass = 'Ingresa tu contraseña actual';
    }else if(this.current_pass !== this.pass){ //validacion de contraseña actual
      this.errorCurrentPass = 'La contraseña actual es incorrecta, intenta de nuevo';
      validacion = true;
    }

    if(!this.new_pass){
      this.errorNewPass = '* Este campo es obligatorio'; //validacion de vacios
      validacion = true;
    }

    if(!this.confirm_pass){ //validacion de contraseña nueva
      this.errorConfirmPass = '* Este campo es obligatorio';
      validacion = true;
    }else if(this.confirm_pass !== this.new_pass){
      this.errorConfirmPass = 'Las contraseñas no coinciden, intenta de nuevo';
      validacion = true;
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
        this.isAlertOpen = true;
        this.confirm();        
      } else {
      console.log("Confirmación de constraseña incorrecta")
      }
      console.log("Nombre usuario: " + this.user);
      console.log("Contraseña nueva: " + this.pass);
    }
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

    // Función para cerrar sesión
    async cerrarSesion(){
      const alert = await this.alertController.create({
        header: '¿Deseas cerrar la sesión?',
        buttons: [
          {
            text: 'NO',
            role: 'Cancel',
            cssClass: 'alert-button-cancel',
          },
          {
            text: 'SI',
            cssClass: 'alert-button-confirm',
            handler: () => {
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
          }
        ]
      });
      await alert.present();
    }

    setOpen(isOpen: boolean) {
      this.isAlertOpen = isOpen;
    }

}


