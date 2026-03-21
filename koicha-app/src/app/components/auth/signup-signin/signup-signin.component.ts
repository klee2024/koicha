import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup-signin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup-signin.component.html',
  styleUrl: './signup-signin.component.css',
})
export class SignupSigninComponent implements OnInit {
  @Input() mode: 'signUp' | 'signIn' = 'signUp';
  @Input() overlay = false;
  @Output() closed = new EventEmitter<void>();
  @Output() dismissed = new EventEmitter<void>();

  errorMessage = '';
  fieldErrors: Record<string, string> = {};
  form!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
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
      this.form.get('username')?.setValidators([Validators.required]);
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
    this.errorMessage = '';
    this.fieldErrors = {};

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.setClientSideFieldErrors();
      return;
    }

    if (this.mode == 'signUp') {
      this.authService.signUpAndSignIn(this.form.value).subscribe({
        next: () => {
          this.closed.emit();
          if (!this.overlay) {
            this.router.navigate(['/taste-profile']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.extractServerErrors(err);
        },
      });
      return;
    }

    this.authService.signIn(this.form.value).subscribe({
      next: () => {
        this.closed.emit();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401 || err.status === 400) {
          this.errorMessage = 'incorrect username or password.';
        } else {
          this.errorMessage = 'something went wrong. please try again.';
        }
      },
    });
  }

  private setClientSideFieldErrors() {
    const controls = this.form.controls;
    if (controls['email']?.errors?.['required']) {
      this.fieldErrors['email'] = 'email is required.';
    } else if (controls['email']?.errors?.['email']) {
      this.fieldErrors['email'] = 'please enter a valid email.';
    }
    if (controls['username']?.errors?.['required']) {
      this.fieldErrors['username'] = 'username is required.';
    }
    if (controls['password']?.errors?.['required']) {
      this.fieldErrors['password'] = 'password is required.';
    } else if (controls['password']?.errors?.['minlength']) {
      this.fieldErrors['password'] = 'password must be at least 8 characters.';
    }
  }

  private extractServerErrors(err: HttpErrorResponse) {
    const body = err.error;
    if (!body || typeof body !== 'object') {
      this.errorMessage = 'something went wrong. please try again.';
      return;
    }

    const generalMessages: string[] = [];
    for (const field of Object.keys(body)) {
      const errors = body[field];
      const message = Array.isArray(errors) ? errors[0] : errors;
      if (['email', 'username', 'password'].includes(field)) {
        this.fieldErrors[field] = message;
      } else {
        generalMessages.push(message);
      }
    }
    if (generalMessages.length) {
      this.errorMessage = generalMessages.join(' ');
    }
  }

  closeForm() {
    this.dismissed.emit();
  }
}
