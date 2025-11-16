import { Component, Input } from '@angular/core';
import { ProductCardData } from '../../utility/product-card/productCardData';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-product-ranking',
  imports: [CommonModule],
  templateUrl: './review-product-ranking.component.html',
  styleUrl: './review-product-ranking.component.css',
})
export class ReviewProductRankingComponent {
  @Input() productCurrentlyReviewing?: ProductCardData;
  @Input() productToCompare?: ProductCardData;
}
