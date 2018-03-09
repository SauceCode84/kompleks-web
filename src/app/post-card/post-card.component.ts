import { Component, OnInit, Input } from "@angular/core";

import { Post } from "../../models/post";
import { PostService } from "../post.service";

@Component({
  selector: "post-card",
  templateUrl: "./post-card.component.html",
  styleUrls: ["./post-card.component.scss"]
})
export class PostCardComponent implements OnInit {

  @Input("post")
  post: Post;

  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  get postType() {
    return PostService.getPostType(this.post);
  }

}
