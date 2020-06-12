import { Component } from '@angular/core';
import { GeneralService } from "../services/general.service";
import { Storage } from '@ionic/storage';

import { Users } from "../model/users";
import { Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { auth } from 'firebase/app';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  users: any[] = [];  
  currentUser: string = '';
  /* heroes: Observable<any[]>; */
  heroes: any[] = [];

  constructor(private services: GeneralService, 
    private localstorage: Storage,
    private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    private storage: AngularFireStorage) {
      /* this.heroes = firestore.collection('heroes').valueChanges(); */
    }

  ngOnInit(){
    this.localstorage.get('currentUser')
    .then((data)=>{
      this.currentUser = data.name.first;
    }).catch((error)=>{
      this.currentUser = 'No se pudo encontrar usuario';
    })

    this.services.getUsers().subscribe((users)=>{
      this.users = <any[]> users['results'];
    })
    this.firestore.collection('heroes').valueChanges()
    .subscribe((heroes)=>{
      this.heroes = <any[]>heroes;
    });
  }

  seletedUser(user:any){
    this.localstorage.set('currentUser',user);
  }

  login() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  loginEmailPassword(email, password) {
    this.auth.signInWithEmailAndPassword(email, password)
    .then((user)=>{
      console.log(user)
    }).catch((error)=>{
      console.error(error);
    })
  }
  logout() {
    this.auth.signOut();
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'ruta';
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
  }

}
