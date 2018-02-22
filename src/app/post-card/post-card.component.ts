import { Component, OnInit } from "@angular/core";

import { Post, PostService } from "../post.service";

@Component({
  selector: "post-card",
  templateUrl: "./post-card.component.html",
  styleUrls: ["./post-card.component.scss"]
})
export class PostCardComponent implements OnInit {

  post: Post;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.post = this.postService.getPost();
  }

  getPostType() {
    switch (this.post.type) {
      case "complaint":
        return "Complaint";

      case "problem":
        return "Problem";
    }
  }

}
