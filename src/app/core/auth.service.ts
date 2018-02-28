import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import * as firebase from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore, AngularFirestoreDocument } from "angularfire2/firestore";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/switchMap";

import { User } from "./models/user";

@Injectable()
export class AuthService {

  user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
    this.user$ = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }

  async googleLogin() {
    let provider = new firebase.auth.GoogleAuthProvider();
    await this.oAuthLogin(provider);
  }

  private async oAuthLogin(provider) {
    let credential = await this.afAuth.auth.signInWithPopup(provider);
    await this.updateUserData(credential.user);
  }

  private async updateUserData(user) {
    let userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    let data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoUrl: user.photoURL
    };

    await userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(["/"]);
  }

}
