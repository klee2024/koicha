import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthButtonsComponent } from '../../auth/auth-buttons/auth-buttons.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, AuthButtonsComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
