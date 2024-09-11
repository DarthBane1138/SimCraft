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

  // Objeto que asocia claves (Sede) con valores (Ruta de imagen de sede)
  sedesPhotos = {
    'Alameda': 'assets/img/Sede-Alameda.jpg',
    'Padre Alonso Ovalle': 'assets/img/Sede-Padre_Alonso_Ovalle.jpg',
    'Antonio Varas': 'assets/img/Sede-Antonio-Varas.jpg',
    'Educacion Continua': 'assets/img/Sede-Educacion-Continua.jpg',
    'Maipu': 'assets/img/Sede_Maipu-1.jpg',
    'Melipilla': 'assets/img/Sede-Melipilla-2.jpg',
    'Plaza Norte': 'assets/img/Sede-Plaza-Norte.png',
    'Plaza Oeste': 'assets/img/Sede-Plaza-Oeste.png',
    'Plaza Vespucio': 'assets/img/Sede-Plaza-Vespucio.jpg',
    'Puente Alto': 'assets/img/Sede-Puente-Alto.jpg',
    'San Bernardo': 'assets/img/Sede-San-Bernardo.jpg',
    'San Carlos de apoquindo': 'assets/img/Sede-San-Carlos-Apoquindo.jpg',
    'San Joaquin': 'assets/img/Sede-San-Joaquin.jpg',
  };

  // Objeto que asocia claves (Sede) con valores (Dirección de sede)
  adresses = {
    'Alameda': 'Av. España 8, Santiago Centro, Metro Estación República (esquina Alameda).',
    'Padre Alonso Ovalle': 'Padre Alonso de Ovalle 1586, Metro La Moneda, Santiago Centro.',
    'Antonio Varas': 'Antonio Varas 666, Providencia.',
    'Educacion Continua': 'Miguel Claro 337, Providencia, Santiago.',
    'Maipu': 'Av. Esquina Blanca 501, Maipú.',
    'Melipilla': 'Serrano 1105, Melipilla.',
    'Plaza Norte': 'Calle Nueva 1660, Huechuraba.',
    'Plaza Oeste': 'Av. Américo Vespucio 1501, Mall Plaza Oeste, Cerrillos.',
    'Plaza Vespucio': 'Froilán Roa 7107, Mall Plaza Vespucio, La Florida.',
    'Puente Alto': 'Av. Concha y Toro 1340 c/San Carlos, Puente Alto.',
    'San Bernardo': 'Freire 857, San Bernardo.',
    'San Carlos de apoquindo': 'Camino El Alba 12881, Las Condes.',
    'San Joaquin': 'Av. Vicuña Mackenna 4917, Metro San Joaquín, San Joaquín.',
  }

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
  console.log("-- Se ha ingresado con --");
  console.log("Nombre usuario: " + this.user);
  console.log("Contraseña: " + this.pass);
  console.log("Correo: " + this.mail);
  console.log("Sede: " + this.location);
  }

  // Getter para obtener la ruta de la foto, basada en la variable location
  get sedePhoto(): string {
    return this.sedesPhotos[this.location as keyof typeof this.sedesPhotos] || "https://ionicframework.com/docs/img/demos/card-media.png";
  }

  // Getter para obtener la dirección de la sede, basada en la variable location
  get adress(): string {
    return this.adresses[this.location as keyof typeof this.adresses] || "Dirección no Disponible"
  }

  // Función para cerrar sesión
  async cerrarSesion() {
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

  // Redirección a Home desde footer
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

  // Redirección a Perfil de Usuario desde footer
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