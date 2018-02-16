import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { WebBluetoothModule } from "@manekinekko/angular-web-bluetooth";

import { AppComponent } from "./app.component";
import { PostCardComponent } from './post-card/post-card.component';
import { AccessComponent } from './access/access.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCardComponent,
    AccessComponent
  ],
  imports: [
    BrowserModule,
    WebBluetoothModule.forRoot({ enableTracing: true })
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
