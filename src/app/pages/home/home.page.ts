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

  user: string='';
  pass: string='';

  constructor(private router:Router) {}

  ngOnInit() {
    let extras =this.router.getCurrentNavigation()?.extras; //el ? es una proteccion contra valores nulos, lo que evita que las paginas se caigan derepente
    if(extras?.state){
      this.user= extras?.state["usuario"]; //if de existencias, permite 
      this.pass= extras?.state["password"];
    }
  console.log("Nombre usuario: " + this.user);
  console.log("Contraseña: " + this.pass);
  }

  @ViewChild(IonModal)
  modal!: IonModal;

  message = '';
  current_pass: string="";
  new_pass: string="";
  confirm_pass: string="";

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.current_pass, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Felicidades, ${ev.detail.data} has cambiado tu contraseña`;
    }
  }

  change_pass () {
    let extras: NavigationExtras ={ //el state es el estado en el que va a viajar el parametro
      state: {
        "changed_user": this.user,
        "changed_pass": this.new_pass,
      },
      replaceUrl: true //reemplazo de url (navegacion previa se olvida y se borra)
    }

    if(this.current_pass == this.pass){
      console.log("Le achuntaste")
      if(this.new_pass == this.confirm_pass) {
        console.log("bien")
        this.pass = this.new_pass;
        console.log("Nombre usuario: " + this.user);
        console.log("Contraseña: " + this.pass);
        this.router.navigate(['login'], extras)
        this.modal.dismiss(this.current_pass, 'confirm');
      }
    } else {
      console.log("aweonao")
    }
  }
}
