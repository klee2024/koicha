import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() preferenceEnumValue = new EventEmitter<number>();

  reviewInputText?: string;
  preferenceInputEnumValue?: number;
  reviewStep: string = 'WRITE_REVIEW';

  // gets the list of products to compare based on the preference value the user selected
  // ex: if the user selected that they liked the product, get only the other products that
  // the user liked
  getProductsToCompare(preferenceInputEnumValue: number) {}

  // saves the review based on the user's inputs
  createReview() {}

  // saves the preferenceInput as the enum value to the component field
  savePreferenceInput(preferenceInputValue: number): void {
    this.preferenceInputEnumValue = preferenceInputValue;
    console.log(this.preferenceInputEnumValue);
  }

  // saves the first step of the review process, which is selecting if they
  // liked the product or didn't (savePreferenceInput) and saves the review text
  saveReviewInput(text: string, preferenceInputValue: number): void {
    this.reviewInputText = text;
    this.reviewStep = 'COMPARE_PRODUCTS';
    console.log(preferenceInputValue);
    this.savePreferenceInput(preferenceInputValue);
    this.preferenceEnumValue.emit(this.preferenceInputEnumValue);
    console.log(this.reviewInputText);
  }
}
