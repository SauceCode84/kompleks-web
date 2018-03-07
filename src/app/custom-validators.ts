import { AbstractControl, FormControl } from "@angular/forms";

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

  static matchPassword(otherPasswordControl: string) {
    let thisControl: FormControl;
    let otherControl: FormControl;

    return (control: FormControl) => {
      if (!control.parent) {
        return null;
      }

      if (!thisControl) {
        thisControl = control;
        otherControl = control.parent.get(otherPasswordControl) as FormControl;

        if (!otherControl) {
          throw new Error(`Other control '${otherPasswordControl}' is not found in parent group`);
        }

        otherControl.valueChanges.subscribe(() => {
          thisControl.updateValueAndValidity();
        });
      }

      if (!otherControl) {
        return null;
      }

      if (thisControl.value !== otherControl.value) {
        return { matchPassword: true };
      }

      return null;
    }
  }

}
