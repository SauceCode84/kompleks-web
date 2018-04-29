import { Injectable } from "@angular/core";

import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";

import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/take";

import { Post } from "../models/post";

interface QueryConfig {
  path: string;
  field: string;
  limit?: number;
  reverse?: boolean;
  prepend?: boolean;
}

@Injectable()
export class PostFeedService {

  private _data = new BehaviorSubject([]);
  private _done = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(false);

  private query: QueryConfig;

  data: Observable<any>;
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._loading.asObservable();

  constructor(private afs: AngularFirestore) { }

  public init(path: string, field: string, opts?: { limit?: number, reverse?: boolean, prepend?: boolean; }) {
    this.query = {
      path,
      field,
      limit: 2,
      reverse: false,
      prepend: false,
      ...opts
    };

    const first = this.afs.collection(this.query.path, ref => {
      return ref
        .orderBy(this.query.field, this.query.reverse ? "desc" : "asc")
        .limit(this.query.limit);
    });

    this.mapAndUpdate(first);

    this.data = this._data.asObservable()
      .scan((acc, val) => {
        return this.query.prepend ? val.concat(acc) : acc.concat(val);
      });
  }

  public loadMore() {
    const cursor = this.getCursor();

    const more = this.afs.collection(this.query.path, ref => {
      return ref
        .orderBy(this.query.field, this.query.reverse ? "desc" : "asc")
        .limit(this.query.limit)
        .startAfter(cursor);
    });

    this.mapAndUpdate(more);
  }

  private getCursor() {
    const current = this._data.value;

    if (current.length) {
      return this.query.prepend ? current[0].doc : current[current.length - 1].doc;
    }

    return null;
  }

  private mapAndUpdate(col: AngularFirestoreCollection<any>) {
    if (this._done.value || this._loading.value) {
      return;
    }

    this._loading.next(true);

    return col.snapshotChanges()
      .do(arr => {
        let values = arr.map(snap => {
          const data = snap.payload.doc.data();
          const doc = snap.payload.doc;

          return { ...data, doc };
        });

        values = this.query.prepend ? values.reverse() : values;

        this._data.next(values);
        this._loading.next(false);

        if (!values.length) {
          this._done.next(true);
        }
      })
      .take(1)
      .subscribe();
  }

}