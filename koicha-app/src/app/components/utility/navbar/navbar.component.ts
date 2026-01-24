import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthButtonsComponent } from '../../auth/auth-buttons/auth-buttons.component';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, AuthButtonsComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}
}
