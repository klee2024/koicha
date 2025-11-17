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
  // TODO: remove console logs when done testing

  // constants for the UI steps of creating a review
  readonly WRITE_REVIEW_STEP = 'WRITE_REVIEW';
  readonly COMPARE_PRODUCTS_STEP = 'COMPARE_PRODUCTS';

  reviewInputText?: string;
  preferenceInputEnumValue?: number;
  reviewStep: string = this.WRITE_REVIEW_STEP;

  @Input() productCard?: ProductCardData;
  @Output() preferenceEnumValue = new EventEmitter<number>();
  @Input() productsToCompare?: ProductCardData[];

  @Output() undoSelected = new EventEmitter<void>();
  @Output() tooToughSelected = new EventEmitter<void>();
  @Output() skipSelected = new EventEmitter<void>();

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
    this.reviewStep = this.COMPARE_PRODUCTS_STEP;
    console.log('preference input value', preferenceInputValue);
    this.savePreferenceInput(preferenceInputValue);
    this.preferenceEnumValue.emit(this.preferenceInputEnumValue);
    console.log(this.reviewInputText);
  }
}
