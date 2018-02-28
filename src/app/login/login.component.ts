import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../core/auth.service";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {

  constructor(private auth: AuthService, private router: Router) { }

  async googleLogin() {
    try {
      await this.auth.googleLogin();
      this.router.navigate(["/"]);
    } catch(err) {
      console.error(err);
    }
  }

}
