import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from "angularfire2/storage";

import { WebBluetoothModule } from "@manekinekko/angular-web-bluetooth";

import { environment } from "../environments/environment";

import { AppComponent } from "./app.component";
import { PostCardComponent } from "./post-card/post-card.component";
import { AccessComponent } from "./access/access.component";

@NgModule({
  declarations: [
    AppComponent,
    PostCardComponent,
    AccessComponent
  ],
  imports: [
    BrowserModule,
    
    // Angular Fire Modules
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,

    WebBluetoothModule.forRoot({ enableTracing: true })
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
