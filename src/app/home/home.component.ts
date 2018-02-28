import { Component, OnInit, OnDestroy, Renderer2 } from "@angular/core";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, "has-navbar-fixed-top");
    this.renderer.addClass(document.body, "has-footer-bar");
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, "has-navbar-fixed-top");
    this.renderer.removeClass(document.body, "has-footer-bar");
  }

}
