import { AbstractControl } from "@angular/forms";

import { AngularFirestore } from "angularfire2/firestore";

import { debounceTime, map, take } from "rxjs/operators";

export class CustomValidators {

  static userEmailUnique (afs: AngularFirestore) {
    return (control: AbstractControl) => {
      const email = control.value.toLowerCase();
      
      return afs.collection("users", ref => ref.where("email", "==", email))
        .valueChanges()
        .pipe(
          debounceTime(500),
          take(1),
          map(users => users.length ? { emailUnique: false } : null)
        );
    }
  }

}
