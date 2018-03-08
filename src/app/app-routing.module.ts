import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./core/auth.guard";

import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    loadChildren: "app/signup/signup.module#SignupModule"
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ AuthGuard ]
})
export class AppRoutingModule { }