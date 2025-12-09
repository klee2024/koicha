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
      this.authService.signUpAndSignIn(this.form.value).subscribe({
        next: () => {
          this.closed.emit();
          this.router.navigate(['/taste-profile']);
        },
        error: () => {
          this.errorMessage = 'Unable to sign up. Please try again.';
        },
      });
      return;
    }

    this.authService.signIn(this.form.value).subscribe({
      next: () => {
        this.closed.emit();
      },
      error: () => {
        this.errorMessage = 'Unable to sign in. Please try again.';
      },
    });
  }

  closeForm() {
    this.closed.emit();
  }
}
