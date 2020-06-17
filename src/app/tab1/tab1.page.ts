import { Component } from '@angular/core';
import { GeneralService } from "../services/general.service";
import { Storage } from '@ionic/storage';

import { Users } from "../model/users";
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

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

  login_email: string;
  login_password: string;
  login_displayName: string;

  users: any[] = [];
  currentUser: string = '';
  /* heroes: Observable<any[]>; */
  heroes: any[] = [];
  percent: number;
  /* uploadPercent: Observable<number>;
  downloadURL: Observable<any>;
   */
  url: string;

  uploadFiles: any[] = [];

  currentUserFirebase: any;

  constructor(private services: GeneralService,
    private localstorage: Storage,
    private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    private storage: AngularFireStorage) {
    /* this.heroes = firestore.collection('heroes').valueChanges(); */
  }

  ngOnInit() {
    this.auth.user.subscribe((user) => {
      this.currentUserFirebase = user;

      this.localstorage.get('currentUser')
        .then((data) => {
          this.currentUser = data.name.first;
        }).catch((error) => {
          this.currentUser = 'No se pudo encontrar usuario';
        })

      this.services.getUsers().subscribe((users) => {
        this.users = <any[]>users['results'];
      })
      this.firestore.collection('heroes').valueChanges()
        .subscribe((heroes) => {
          this.heroes = <any[]>heroes;
        });

      this.firestore.collection('uploads', ref => ref.where('owner', '==', this.currentUserFirebase.uid)).valueChanges()
        .subscribe((files) => {
          this.uploadFiles = files;

          console.log(this.uploadFiles);
        })


    });



  }

  seletedUser(user: any) {
    this.localstorage.set('currentUser', user);
  }

  login() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((user) => {
      this.firestore.collection('users').doc(user.user.uid).set({ email: user.user.email, displayname: user.user.displayName, method: user.user.providerId, })
      console.log(user);
      this.ngOnInit();
    })
  }

  loginFacebook() {
    this.auth.signInWithPopup(new auth.FacebookAuthProvider()).then((user) => {
      this.firestore.collection('users').doc(user.user.uid).set({ email: user.user.email, displayname: user.user.displayName, method: user.user.providerId, })
      console.log(user);
      this.ngOnInit();
    })
  }

  signUpEmailPassword() {
    if (this.login_email !== undefined && this.login_email !== ''
      && this.login_password !== undefined && this.login_password !== '') {
      this.auth.createUserWithEmailAndPassword(this.login_email, this.login_password)
        .then((userInfo) => {
          if (this.login_displayName !== undefined) {
            //let user = JSON.parse(JSON.stringify(userInfo.user));
            let user = userInfo.user;
            user.updateProfile({displayName: this.login_displayName});
            //user.displayName = this.login_displayName;
            //this.auth.updateCurrentUser(user);
          }

          this.firestore.collection('users').doc(userInfo.user.uid).set({ email: userInfo.user.email, displayname: userInfo.user.displayName, method: userInfo.user.providerId, })
          console.log(userInfo);
          this.ngOnInit();
        }).catch((error) => {
          console.error(error);
        });
    }
  }

  loginEmailPassword() {
    if (this.login_email !== undefined && this.login_email !== ''
      && this.login_password !== undefined && this.login_password !== '') {
      this.auth.signInWithEmailAndPassword(this.login_email, this.login_password)
        .then((user) => {
          //this.firestore.collection('users').doc(user.user.uid).set({ email: user.user.email, displayname: user.user.displayName, method: user.user.providerId, })
          console.log(user);
          this.ngOnInit();
        }).catch((error) => {
          console.error(error);
        });
    }
  }
  logout() {
    this.auth.signOut();
  }

  /* getFileFromStorage(path_gs) {
    const file_gs = this.storage.ref(path_gs);
    file_gs.getDownloadURL().toPromise().then((response_file) => {
      console.log(response_file);
      return response_file;
    }).catch((error) => {
      console.error(error);
      return '';
    })
  } */

  uploadFile(event) {
    const file = event.target.files[0];
    const now = new Date().getTime();

    const filePath = 'archivos_cargados/' + this.currentUserFirebase.uid + '/' + now;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    /* this.uploadPercent = task.percentageChanges(); */

    task.snapshotChanges().pipe(finalize(() =>
      /* this.downloadURL = ref.getDownloadURL() */
      ref.getDownloadURL().subscribe((link) => {
        this.firestore.collection('uploads')
          .doc(now.toString())
          .set({ owner: this.currentUserFirebase.uid, file: link, created_at: new Date() })
        this.url = link;
      })
    )).subscribe();


    task.percentageChanges().subscribe((percent) => {
      this.percent = percent;
    })


  }

}
