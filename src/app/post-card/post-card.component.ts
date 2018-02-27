import { Component, OnInit } from "@angular/core";

import { Post } from "../../models/post";
import { PostService } from "../post.service";

@Component({
  selector: "post-card",
  templateUrl: "./post-card.component.html",
  styleUrls: ["./post-card.component.scss"]
})
export class PostCardComponent implements OnInit {

  post: Post;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPost()
      .subscribe(post => this.post = post);
  }

  get postType() {
    return PostService.getPostType(this.post);
  }

}
