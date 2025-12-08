import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup-signin.component.html',
  styleUrl: './signup-signin.component.css',
})
export class SignupSigninComponent implements OnInit {
  @Input() mode: 'signUp' | 'signIn' = 'signIn';

  // TODO: implement dynamic error messages
  // TODO: add proper form validators that populate the error message
  errorMessage = '';
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      email: [''],
      username: [''],
      password: [''],
    });
  }

  ngOnInit() {
    if (this.mode === 'signIn') {
      // sign in: no email, username + password required
      this.form.get('email')?.clearValidators();
      this.form
        .get('username')
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
      this.authService
        .signUp(this.form.value)
        .subscribe((response) => console.log('new user ', response));
      // this.router.navigate(['/taste-profile']);
    }
    if (this.mode == 'signIn') {
      // TODO: sign the user in
      this.authService.signIn(this.form.value);
      // TODO: close the component when the user is signed in
    }
  }
}
