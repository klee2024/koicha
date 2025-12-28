import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductCardComponent } from './components/utility/product-card/product-card.component';
import { RecommendationFeedComponent } from './components/recommendation-feed/recommendation-feed.component';
import { NavbarComponent } from './components/utility/navbar/navbar.component';
import { DropdownPopupComponent } from './components/utility/dropdown-popup/dropdown-popup.component';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, DropdownPopupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'koicha-app';

  constructor(private authService: AuthService) {
    this.authService.checkAuth().subscribe();
  }
}
