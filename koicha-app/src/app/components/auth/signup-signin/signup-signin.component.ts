import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup-signin.component.html',
  styleUrl: './signup-signin.component.css',
})
export class SignupSigninComponent implements OnInit {
  @Input() mode: 'signUp' | 'signIn' = 'signUp';

  // TODO: implement dynamic error messages
  errorMessage = '';
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: [''],
      username: [''],
      password: [''],
    });
  }

  ngOnInit() {
    if (this.mode === 'signIn') {
      // sign in: no username, email + password required
      this.form.get('username')?.clearValidators();
      this.form
        .get('email')
        ?.setValidators([Validators.required, Validators.email]);
      this.form.get('password')?.setValidators([Validators.required]);
    } else {
      // sign up: email + username + password
      this.form
        .get('email')
        ?.setValidators([Validators.required, Validators.email]);
      this.form.get('username')?.setValidators([Validators.required]);
      this.form
        .get('password')
        ?.setValidators([Validators.required, Validators.minLength(8)]);
    }

    this.form.updateValueAndValidity();
  }

  submit() {
    if (this.mode == 'signUp') {
      // TODO: sign the user up
      console.log('form', this.form);
    }
    if (this.mode == 'signIn') {
      // TODO: sign the user in
      console.log('form', this.form);
    }
  }
}
