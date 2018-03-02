import { Injectable } from "@angular/core";

import * as firebase from "firebase";
import { AngularFirestore } from "angularfire2/firestore";

import { Subject } from "rxjs/Subject";

import { User } from "./models/user";

@Injectable()
export class MessagingService {

  private messaging = firebase.messaging();
  private messageSource = new Subject();

  currentMessage$ = this.messageSource.asObservable();

  constructor(private afs: AngularFirestore) { }

  async getPermission(user: User) {
    try {
      await this.messaging.requestPermission();
      console.log("Notification permission granted");

      let token = await this.messaging.getToken();
      console.log(token);

      await this.saveToken(user, token);
    } catch(err) {
      console.error(err);
    }
  }

  async monitorRefresh(user: User) {
    this.messaging.onTokenRefresh(async () => {
      try {
        let refreshedToken = await this.messaging.getToken();
        console.log("Token refreshed");
        
        await this.saveToken(user, refreshedToken);
      } catch(err) {
        console.error("Unable to retrieve new token", err);
      }
    });
  }

  receiveMessages() {
    this.messaging.onMessage(payload => {
      console.log("Message received", payload);
      this.messageSource.next(payload);
    });
  }

  private async saveToken(user: User, token: string) {
    let currentTokens = user.fcmTokens || {};

    if (!currentTokens[token]) {
      let userRef = this.afs.collection("users").doc(user.uid);
      let tokens = { ...currentTokens, [token]: true };

      await userRef.update({ fcmTokens: tokens });
    }
  }

}
