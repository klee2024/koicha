import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecommendationCardComponent } from './components/recommendation-card/recommendation-card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RecommendationCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'koicha-app';
}
