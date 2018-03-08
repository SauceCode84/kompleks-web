import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from "angularfire2/storage";

import { WebBluetoothModule } from "@manekinekko/angular-web-bluetooth";

import { environment } from "../environments/environment";

import { CoreModule } from "./core/core.module";

import { PostService } from "./post.service";

import { AppComponent } from "./app.component";
import { CreatePostComponent } from "./create-post/create-post.component";
import { PostCardComponent } from "./post-card/post-card.component";
import { AccessComponent } from "./access/access.component";
import { DropZoneDirective } from "./drop-zone.directive";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { FileSizePipe } from "./file-size.pipe";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { FooterBarComponent } from "./footer-bar/footer-bar.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterBarComponent,
    CreatePostComponent,
    PostCardComponent,
    AccessComponent,
    FileUploadComponent,
    UserProfileComponent,
    HomeComponent,
    LoginComponent,
    
    DropZoneDirective,
    
    FileSizePipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,

    AppRoutingModule,
    
    // Angular Fire Modules
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,

    WebBluetoothModule.forRoot({ enableTracing: true }),

    CoreModule
  ],
  providers: [
    PostService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
