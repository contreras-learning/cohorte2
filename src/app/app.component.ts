import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


/** 
 * Paquetes
 * Paso 1: Instalamos el plugin
 * Paso 2: Instalamos el paquete de node
 * App module
 * Paso 1: Import Module
 * Paso 2: Agregar el modulo
 * Componente
 * Paso 1: Import
 * Paso 2: Constructor
 * Paso 3: Usar
*/

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
