import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFirestore } from "angularfire2/firestore";

import { AuthService } from "../core/auth.service";
import { CustomValidators } from "../custom-validators";

interface SignupViewModel {
  email: string;
  password: string;
}

@Component({
  selector: "signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private auth: AuthService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ["",
        [ Validators.required, Validators.email ],
        CustomValidators.userEmailUnique(this.afs)],
      password: []
    });
  }

  get email(): FormControl {
    return this.signupForm.get("email") as FormControl;
  }

  get password(): FormControl {
    return this.signupForm.get("password") as FormControl;
  }

  async signUp() {
    let { email, password } = this.signupForm.value as SignupViewModel;
    //await this.auth.emailSignUp(email, password);

    console.log(this.email.getError("emailUnique"));
  }

}
