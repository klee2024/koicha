import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductCardContentComponent } from '../utility/product-card-content/product-card-content.component';
import { Preparation } from '../../models/preparation';
import { Tag } from '../../models/tag';

@Component({
  selector: 'app-review-card-expanded',
  standalone: true,
  imports: [ProductCardContentComponent],
  templateUrl: './review-card-expanded.component.html',
  styleUrl: './review-card-expanded.component.css',
})
export class ReviewCardExpandedComponent {
  @Input() id!: string;
  @Input() name!: string;
  @Input() brand!: string;
  @Input() preparation!: Preparation;
  @Input() matchPercentage!: number;
  @Input() tags!: Tag[];
  @Input() productUrl!: string;
  @Input() variant: 'recommendation' | 'review' = 'recommendation';
  @Input() userRating!: number;
  @Input() userRanking!: number;
  @Input() review!: string;
  @Output() closed = new EventEmitter<void>();
}
