import { Component, OnInit } from "@angular/core";

import { PostFeedService } from "../post-feed.service";

@Component({
  selector: "post-feed",
  templateUrl: "./post-feed.component.html",
  styleUrls: ["./post-feed.component.scss"]
})
export class PostFeedComponent implements OnInit {

  constructor(public postFeed: PostFeedService) { }

  ngOnInit() {
    this.postFeed.init("posts", "timestamp", { reverse: true, prepend: false });
  }

  scrollHandler(event) {
    console.log(event);

    if (event === "bottom") {
      //this.postFeed.loadMore()
    }
  }

}
