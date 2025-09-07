import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductCardComponent } from './components/utility/product-card/product-card.component';
import { RecommendationFeedComponent } from './components/recommendation-feed/recommendation-feed.component';
import { NavbarComponent } from './components/utility/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'koicha-app';
}
