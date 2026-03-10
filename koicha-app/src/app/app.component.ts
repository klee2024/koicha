import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/utility/navbar/navbar.component';
import { DropdownPopupComponent } from './components/utility/dropdown-popup/dropdown-popup.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, DropdownPopupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'koicha-app';
}
