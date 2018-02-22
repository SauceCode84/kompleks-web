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
import { DropZoneDirective } from "./drop-zone.directive";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { FileSizePipe } from "./file-size.pipe";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterBarComponent,
    PostCardComponent,
    AccessComponent,
    FileUploadComponent,
    
    DropZoneDirective,
    
    FileSizePipe
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
