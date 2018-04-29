import { Component, OnInit, Inject, HostListener } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import { WINDOW } from "../window.service";

import { PostFeedService } from "../post-feed.service";

@Component({
  selector: "post-feed",
  templateUrl: "./post-feed.component.html",
  styleUrls: ["./post-feed.component.scss"]
})
export class PostFeedComponent implements OnInit {

  //private scrollPosition = new EventEmitter();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    public postFeed: PostFeedService) { }

  ngOnInit() {
    this.postFeed.init("posts", "timestamp", { reverse: true, prepend: false });
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const isWindowBottom = (this.window.innerHeight + this.window.scrollY) >= this.document.body.offsetHeight;
    /*let number = this.window.pageYOffset || this.document.documentElement.scrollTop;
    
    console.log(number);
    
    console.log(this.window.innerHeight);
    console.log(this.window.scrollY);
    console.log(this.document.body.offsetHeight);*/

    if (isWindowBottom) {
      console.log("bottom");
      this.postFeed.loadMore();
    }
  }
  /*
      let top: number = event.target.scrollTop;
      let height: number = this.el.nativeElement.scrollHeight;
      let offset: number = this.el.nativeElement.offsetHeight;

      if (top > height - offset - 1) {
        this.scrollPosition.emit("bottom");
      }

      if (top === 0) {
        this.scrollPosition.emit("top");
      }
  */

  /*scrollHandler(event) {
    console.log(event);

    if (event === "bottom") {
      //this.postFeed.loadMore()
    }
  }*/

}
