import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  constructor(private router:Router, private alertController: AlertController) {}

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
  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Yes',
      cssClass: 'alert-button-confirm',
    },
  ];

  
  // Función para cerrar sesión
  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Deseas cerrar la sesión?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'SI',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.confirm();
          }
        }
      ]
    });

    await alert.present();
  }

  // Redirección después de confirmar logout
  confirm() {
    let extras: NavigationExtras = {
      state: {
        "user": this.user,
        "pass": this.pass,
        "mail": this.mail,
        "location": this.location,
      },
      replaceUrl: true
    };
    this.router.navigate(['login'], extras);
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