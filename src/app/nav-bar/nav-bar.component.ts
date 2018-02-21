import { Component, OnInit } from "@angular/core";

@Component({
  selector: "nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"]
})
export class NavBarComponent implements OnInit {

  menuActive: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

}
