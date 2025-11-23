import { Component, Input } from '@angular/core';
import { ProductLineup } from '../create-review-card/product-lineup';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ranking-lineup',
  imports: [CommonModule],
  templateUrl: './ranking-lineup.component.html',
  styleUrl: './ranking-lineup.component.css',
})
export class RankingLineupComponent {
  @Input() productLineup?: ProductLineup[];
}
