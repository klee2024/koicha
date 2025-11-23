import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReviewPreferenceSelectorComponent } from '../review-preference-selector/review-preference-selector.component';
import { ReviewProductRankingComponent } from '../review-product-ranking/review-product-ranking.component';
import { ProductCardContentComponent } from '../../utility/product-card-content/product-card-content.component';
import { ProductCardData } from '../../utility/product-card/productCardData';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../utility/product-card/product-card.component';
import {
  ReviewPreference,
  ReviewSubPreference,
} from '../../../models/review-preference';
import { ReviewProductSliderComponent } from '../review-product-slider/review-product-slider.component';
import { RankingLineupComponent } from '../ranking-lineup/ranking-lineup.component';
import { ProductLineup } from './product-lineup';
import { ReviewService } from '../../../services/review.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-review-card',
  imports: [
    ReviewPreferenceSelectorComponent,
    ReviewProductRankingComponent,
    ProductCardContentComponent,
    CommonModule,
    ProductCardComponent,
    FormsModule,
    ReviewProductSliderComponent,
    RankingLineupComponent,
  ],
  templateUrl: './create-review-card.component.html',
  styleUrl: './create-review-card.component.css',
})
export class CreateReviewCardComponent implements OnInit {
  // TODO: remove console logs when done testing

  // constants for the UI steps of creating a review
  readonly WRITE_REVIEW_STEP = 'WRITE_REVIEW';
  readonly COMPARE_PRODUCTS_STEP = 'COMPARE_PRODUCTS';

  reviewStep: string = this.WRITE_REVIEW_STEP;
  reviewInputText?: string;

  // preference selector
  selectedPreference?: string;
  selectedSubPreference?: string;

  // rating slider
  minSubPreferenceValue?: number;
  maxSubPreferenceValue?: number;
  selectedRating?: number;

  // product lineup
  productLineup?: ProductLineup[];

  preferences$!: Observable<ReviewPreference[]>;
  subPreferences$!: Observable<ReviewSubPreference[]>;

  @Input() productCard?: ProductCardData;
  @Input() productsToCompare?: ProductCardData[];

  // TODO: Revisit these outputs post MVP
  // @Output() undoSelected = new EventEmitter<void>();
  // @Output() tooToughSelected = new EventEmitter<void>();
  // @Output() skipSelected = new EventEmitter<void>();

  constructor(private reviewPreferenceService: ReviewService) {}

  ngOnInit(): void {
    this.reviewPreferenceService.getPreferenceBuckets();
    this.preferences$ = this.reviewPreferenceService.preferences$;
    console.log('preferences: ', this.preferences$);
  }

  // saves the review based on the user's inputs
  createReview() {}

  // saves the preferenceInput as the enum value to the component field
  savePreferenceInput(preferenceInputValue: string): void {
    this.selectedPreference = preferenceInputValue;
    console.log(this.selectedPreference);
  }

  // saves the first step of the review process, which is selecting if they
  // liked the product or didn't (savePreferenceInput) and saves the review text
  saveReviewInput(text: string, preferenceInputValue: string): void {
    this.reviewInputText = text;
    this.reviewStep = this.COMPARE_PRODUCTS_STEP;
    console.log('preference input value', preferenceInputValue);
    this.savePreferenceInput(preferenceInputValue);
    this.onPreferenceSelected();
    console.log(this.reviewInputText);
  }

  onPreferenceSelected() {
    // TODO: call the service to get the list of subpreferences
    // pass these down to the slider component
    if (this.selectedPreference) {
      this.reviewPreferenceService.getSubPreferenceBucket(
        this.selectedPreference
      );
      this.subPreferences$ = this.reviewPreferenceService.subPreferences$;
      console.log(
        'sub preference: ',
        this.reviewPreferenceService.subPreferences
      );
      // TODO: fix getting min and max values
      const subPreferenceValueRange =
        this.reviewPreferenceService.getSubPreferencesValueRange();
      if (
        subPreferenceValueRange.hasOwnProperty('min') &&
        subPreferenceValueRange.hasOwnProperty('max')
      ) {
        // set min and max
        this.minSubPreferenceValue = subPreferenceValueRange['min'];
        this.maxSubPreferenceValue = subPreferenceValueRange['max'];
      }
    }
  }

  onSliderChange(ratingValue: number) {
    // call the service to get the products before and after this value
    // set ranking-lineup to not visible
    this.selectedRating = ratingValue;
    if (this.selectedRating) {
      this.productLineup = this.reviewPreferenceService.getProductLineup(
        this.selectedRating
      );
    }
  }

  onSubPreferenceSelected(subPreference: string) {
    console.log(subPreference);
  }

  receiveRatingScore(score: number) {
    // TODO:
    // get the line up products based on the score
    // emit the lineup back down to the lineup component
  }
}
