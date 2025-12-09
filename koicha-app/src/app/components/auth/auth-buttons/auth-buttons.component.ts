import { Component } from '@angular/core';
import { SignupSigninComponent } from '../signup-signin/signup-signin.component';

@Component({
  selector: 'app-auth-buttons',
  imports: [SignupSigninComponent],
  templateUrl: './auth-buttons.component.html',
  styleUrl: './auth-buttons.component.css',
})
export class AuthButtonsComponent {
  activeMode: 'signUp' | 'signIn' | null = null;

  openAuth(mode: 'signUp' | 'signIn') {
    this.activeMode = mode;
  }

  closeAuth() {
    this.activeMode = null;
  }
}
