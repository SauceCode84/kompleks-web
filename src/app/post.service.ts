import { Injectable } from "@angular/core";

import { Post } from "../models/post";

@Injectable()
export class PostService {

  constructor() { }

  getPost(): Post {
    return {
      type: "complaint",
      status: "pending",
      timestamp: new Date(2018, 1, 22),
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sapiente deserunt tempore iste mollitia! Et accusamus vero dignissimos dolorem quam!",
      user: {
        firstName: "Richard",
        lastName: "Ueckermann",
        avatarUrl: "https://bulma.io/images/placeholders/96x96.png",
        unit: "31 Ruby Corner"
      },
      commentCount: 5
    };
  }

}
