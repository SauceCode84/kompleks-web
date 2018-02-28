import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../core/auth.service";

type ButtonStatus = "enabled" | "disabled" | "loading";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {

  loginButtonStatus: ButtonStatus;
  googleButtonStatus: ButtonStatus;

  constructor(private auth: AuthService, private router: Router) {
    this.enableAllButtons();
  }

  private enableAllButtons() {
    this.loginButtonStatus = "enabled";
    this.googleButtonStatus = "enabled";
  }

  private disableAllButtons() {
    this.loginButtonStatus = "disabled";
    this.googleButtonStatus = "disabled";
  }

  async googleLogin() {
    try {
      this.disableAllButtons();
      this.googleButtonStatus = "loading";

      await this.auth.googleLogin();
      await this.router.navigate(["/"]);
    } catch(err) {
      console.error(err);
      this.enableAllButtons();
    }
  }

}
