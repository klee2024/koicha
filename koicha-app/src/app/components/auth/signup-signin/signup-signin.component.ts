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
        error: (err: HttpErrorResponse) => {
          this.errorMessage =
            this.extractErrorMessage(err) ||
            'unable to sign up. please try again.';
        },
      });
      return;
    }

    this.authService.signIn(this.form.value).subscribe({
      next: () => {
        this.closed.emit();
      },
      error: () => {
        this.errorMessage = 'unable to sign in. please try again.';
      },
    });
  }

  private extractErrorMessage(err: HttpErrorResponse): string | null {
    const body = err.error;
    if (!body || typeof body !== 'object') return null;

    const messages: string[] = [];
    for (const field of Object.keys(body)) {
      const fieldErrors = body[field];
      if (Array.isArray(fieldErrors)) {
        messages.push(...fieldErrors);
      } else if (typeof fieldErrors === 'string') {
        messages.push(fieldErrors);
      }
    }
    return messages.length ? messages.join(' ') : null;
  }

  closeForm() {
    this.closed.emit();
  }
}
