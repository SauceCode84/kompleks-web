import { Component } from "@angular/core";

import { AngularFireUploadTask, AngularFireStorage } from "angularfire2/storage";
import { AngularFirestore } from "angularfire2/firestore";

import { Observable } from "rxjs/Observable";
import { tap } from "rxjs/operators";
import { UploadTaskSnapshot } from "@firebase/storage-types";


@Component({
  selector: "file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"]
})
export class FileUploadComponent {

  // upload task
  task: AngularFireUploadTask;

  // progress monitor
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // download url
  downloadURL: Observable<string>;

  isHovering: boolean;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) { }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    // get the first file
    let file = event.item(0);

    if (file.type.split("/")[0] !== "image") {
      console.error("Unsupported file type :(");
      return;
    }

    // storage path
    let path = `test/${new Date().getTime()}_${file.name}`;

    // metadata
    let customMetadata = { app: "Kompleks" };

    // upload task
    this.task = this.storage.upload(path, file, { customMetadata });

    // progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap((snap: UploadTaskSnapshot) => {
        if (snap.bytesTransferred === snap.totalBytes) {
          // update firestore on completion
          this.db.collection("photos").add({ path, size: snap.totalBytes });
        }
      })
    );
      

    // file's download URL
    this.downloadURL = this.task.downloadURL();
  }

  isActive(snapshot: UploadTaskSnapshot) {
    return snapshot.state === "running";
  }

}
