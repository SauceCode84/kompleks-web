import { Injectable } from "@angular/core";

export interface User {
  firstName: string;
  lastName: string;
  avatarUrl: string;
  unit: string;
}

export type PostType = "complaint" | "problem";

export type PostStatus = "pending" | "inProgress" | "completed";

export interface Post {
  type: PostType;
  status: PostStatus;
  timestamp: Date;
  description: string;
  user: User;
  commentCount: number;
}

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
