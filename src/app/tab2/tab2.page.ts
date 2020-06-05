import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { GeneralService } from "../services/general.service";
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { Users } from "../model/users";

/* 
Paso 1: Import
Paso 2: Constructor
Paso 3: Usar
*/

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private instancia: ActionSheetController,
    private alert: AlertController, 
    private toastController: ToastController, 
    private services: GeneralService,
    private geolocation: Geolocation) { }

  users: any[] = [];

  ngOnInit() {
    this.services.getUsers().subscribe((users)=>{
      this.users = <any[]> users['results'];
    })
    /* this.users.push({ title: 'Obi', subtitle: 'Yedi Master', description: 'Anaki\'s Advisor', avatar: 'https://raw.githubusercontent.com/ionic-team/ionic-docs/master/src/demos/api/list/avatar-ben.png' });
    this.users.push({ title: 'Leia', subtitle: 'Princess', description: 'Daugther of Anaki', avatar: 'https://raw.githubusercontent.com/ionic-team/ionic-docs/master/src/demos/api/list/avatar-leia.png' }) */
  }


  async userSeleted(user: Users) {
    let toast = await this.toastController.create({ 
      duration: 3000,
      header: 'Se ha elegido a ' + user.title, 
      message: 'Soy ' + user.description, 
      position: 'bottom',
      buttons: [{
        handler:()=>{
          console.log('Se ha eliminado el usuario');
          this.users.pop();
        },
        text: 'Eliminar',
        icon: 'trash'
      }]
    });
    toast.present();

  }

  async confimarBorrado() {
    const element = await this.alert.create({
      header: 'En realidad quiere eliminar este elemento',
      message: 'Esta acción no se puede deshacer, por favor debe estar seguro de la acción.',
      buttons: [
        {
          text: 'Confirmar',
          handler: () => {
            console.log('Se confirmo la acción');
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Se canceló la acción');
          }
        }
      ]
    });
    element.present();
  }

  async mostrarUbicacion(lat, long, accuracy) {
    const element = await this.alert.create({
      header: 'Esta es tu ubicación',
      message: 'Tu latitud es:' + lat + ', longitud: ' + long + ', con una precisión de: ' + accuracy,
      buttons: [
        {
          text: 'Cerrar',
          handler: () => {
            console.log('Se cerró el mensaje');
          }
        },        
      ]
    });
    element.present();
  }

  async mostrarHoja() {
    const sheet = await this.instancia.create({
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
          this.confimarBorrado();
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'caret-forward-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Location',
        icon: 'location',
        handler: () => {

          this.geolocation.getCurrentPosition().then((resp) => {
            // resp.coords.latitude
            // resp.coords.longitude
            this.mostrarUbicacion(resp.coords.latitude,resp.coords.longitude,resp.coords.accuracy);
           }).catch((error) => {
             console.log('Error getting location', error);
           });

          
          //console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }],
      header: 'Ejemplo'
    });
    sheet.present();

  }

}
