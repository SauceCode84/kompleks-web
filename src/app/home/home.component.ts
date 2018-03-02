import { Component, OnInit, OnDestroy, Renderer2 } from "@angular/core";

import { MessagingService } from "../core/messaging.service";
import { AuthService } from "../core/auth.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private renderer: Renderer2,
    public msg: MessagingService,
    public auth: AuthService) {
    this.renderer.addClass(document.body, "has-navbar-fixed-top");
    this.renderer.addClass(document.body, "has-footer-bar");
  }

  ngOnInit() {
    this.auth.user$
      .filter(user => !!user)
      .take(1)
      .subscribe(user => {
        if (user) {
          this.msg.getPermission(user);
          this.msg.monitorRefresh(user);
          this.msg.receiveMessages();
        }
      });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, "has-navbar-fixed-top");
    this.renderer.removeClass(document.body, "has-footer-bar");
  }

}
