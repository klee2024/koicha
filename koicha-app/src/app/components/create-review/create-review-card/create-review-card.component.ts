import { Component, Input } from '@angular/core';
import { ReviewPreferenceSelectorComponent } from '../review-preference-selector/review-preference-selector.component';
import { ReviewProductRankingComponent } from '../review-product-ranking/review-product-ranking.component';
import { ProductCardContentComponent } from '../../utility/product-card-content/product-card-content.component';
import { ProductCardData } from '../../utility/product-card/productCardData';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../utility/product-card/product-card.component';

@Component({
  selector: 'app-create-review-card',
  imports: [
    ReviewPreferenceSelectorComponent,
    ReviewProductRankingComponent,
    ProductCardContentComponent,
    CommonModule,
    ProductCardComponent,
  ],
  templateUrl: './create-review-card.component.html',
  styleUrl: './create-review-card.component.css',
})
export class CreateReviewCardComponent {
  @Input() productCard?: ProductCardData;

  reviewInputText?: string;
  reviewStep: string = 'WRITE_REVIEW';

  saveReviewInput(text: string): void {
    this.reviewInputText = text;
    this.reviewStep = 'COMPARE_PRODUCTS';
    console.log(this.reviewInputText);
  }
}
