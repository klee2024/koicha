import { Component, Input } from '@angular/core';
import { ReviewPreferenceSelectorComponent } from '../review-preference-selector/review-preference-selector.component';
import { ReviewProductRankingComponent } from '../review-product-ranking/review-product-ranking.component';
import { ProductCardContentComponent } from '../../utility/product-card-content/product-card-content.component';
import { ProductCardData } from '../../utility/product-card/productCardData';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../utility/product-card/product-card.component';
import { ReviewPreferenceName } from '../../../models/review-preference';

@Component({
  selector: 'app-create-review-card',
  imports: [
    ReviewPreferenceSelectorComponent,
    ReviewProductRankingComponent,
    ProductCardContentComponent,
    CommonModule,
    ProductCardComponent,
    FormsModule,
  ],
  templateUrl: './create-review-card.component.html',
  styleUrl: './create-review-card.component.css',
})
export class CreateReviewCardComponent {
  public reviewPreferenceNameEnum = ReviewPreferenceName;
  @Input() productCard?: ProductCardData;

  reviewInputText?: string;
  preferenceInputEnumValue?: number;
  reviewStep: string = 'WRITE_REVIEW';

  savePreferenceInput(preferenceInputValue: number): void {
    // convert the value to a string
    this.preferenceInputEnumValue = preferenceInputValue;
    console.log(this.preferenceInputEnumValue);
  }

  saveReviewInput(text: string, preferenceInputValue: number): void {
    this.reviewInputText = text;
    this.reviewStep = 'COMPARE_PRODUCTS';
    console.log(preferenceInputValue);
    this.savePreferenceInput(preferenceInputValue);
    console.log(this.reviewInputText);
  }
}
