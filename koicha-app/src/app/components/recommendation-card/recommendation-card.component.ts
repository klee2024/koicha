import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tag } from '../../models/tag';
import { Preparation } from '../../models/preparation';

@Component({
  selector: 'app-recommendation-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommendation-card.component.html',
  styleUrl: './recommendation-card.component.css',
})
export class RecommendationCardComponent {
  @Input() id!: number;
  @Input() name!: string;
  @Input() preparation!: Preparation;
  @Input() matchPercentage!: number;
  @Input() imageUrl!: string;
  @Input() tags!: Tag[];
  @Input() productUrl!: string;

  trackById(index: number, item: { id: string }) {
    return item.id;
  }
}
