import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";

import { Post } from "../models/post";

@Injectable()
export class PostService {

  constructor() { }

  static getPostType(post: Post) {
    if (!post) {
      return "N/A";
    }

    switch (post.type) {
      case "complaint":
        return "Complaint";

      case "problem":
        return "Problem";
    }
  }

  getPost(): Observable<Post> {
    return Observable.of(<Post>{
      type: "complaint",
      status: "pending",
      timestamp: new Date(2018, 1, 22),
      heading: "Geyser Leaking",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sapiente deserunt tempore iste mollitia! Et accusamus vero dignissimos dolorem quam!",
      user: {
        firstName: "Richard",
        lastName: "Ueckermann",
        avatarUrl: "https://bulma.io/images/placeholders/96x96.png",
        unit: "31 Ruby Corner"
      },
      commentCount: 5
    });
  }

}
