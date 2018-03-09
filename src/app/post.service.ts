import { Injectable } from "@angular/core";

import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import * as firebase from "firebase";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";

import { Post } from "../models/post";
import { User } from "./core/models/user";

const getServerTimestamp = () => firebase.firestore.FieldValue.serverTimestamp();

@Injectable()
export class PostService {

  private postCollection: AngularFirestoreCollection<Post>;

  constructor(private afs: AngularFirestore) {
    this.postCollection = this.afs.collection("posts");
  }

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

  getPost(id: string): Observable<Post> {
    return this.afs.doc<Post>("posts/" + id).valueChanges();

    /*return Observable.of(<Post>{
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
    });*/
  }

  createPost(newPost: { heading: string, description: string }, user: User) {
    const timestamp = getServerTimestamp();
    
    return this.postCollection.add({
      ...newPost,
      timestamp,
      type: "problem",
      status: "pending",
      user: {
        firstName: user.displayName,
        lastName: user.displayName,
        avatarUrl: user.photoUrl,
        unit: ""
      }
    });
  }

}
