import { NgModule } from "@angular/core";

import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFirestoreModule } from "angularfire2/firestore";

import { AuthService } from "./auth.service";
import { MessagingService } from "./messaging.service";

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [ AuthService, MessagingService ]
})
export class CoreModule { }
