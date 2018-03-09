import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

import { AuthService } from "../core/auth.service";
import { PostService } from "../post.service";
import { User } from "../core/models/user";

@Component({
  selector: "create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.scss"]
})
export class CreatePostComponent implements OnInit {

  user: User;
  createPostForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private postService: PostService) {
    this.auth.user$
      .subscribe(user => {
        console.log(user);
        this.user = user;
      });

    this.createPostForm = this.fb.group({
      heading: [""],
      description: [""]
    });
  }

  ngOnInit() {
  }

  async submitPost() {
    console.log(this.createPostForm.value);
    await this.postService.createPost(this.createPostForm.value, this.user);
  }

}
