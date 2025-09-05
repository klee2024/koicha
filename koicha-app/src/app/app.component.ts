import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { RecommendationFeedComponent } from './components/recommendation-feed/recommendation-feed.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductCardComponent, RecommendationFeedComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'koicha-app';
}
