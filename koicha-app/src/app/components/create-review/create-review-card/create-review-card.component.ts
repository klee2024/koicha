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
import { UserReviewRequest } from '../../../models/review';

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
  selectedPreference?: ReviewPreference;
  selectedSubPreference?: ReviewSubPreference;

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
  @Output() closeSelected = new EventEmitter<void>();
  @Output() reviewCreated = new EventEmitter<ProductCardData>();

  isCardVisible = true;

  // TODO: POST-MVP Revisit these outputs
  // @Output() undoSelected = new EventEmitter<void>();
  // @Output() tooToughSelected = new EventEmitter<void>();
  // @Output() skipSelected = new EventEmitter<void>();

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviewService.getPreferenceBuckets();
    this.preferences$ = this.reviewService.preferences$;
  }

  // saves the review based on the user's inputs
  createReview() {
    if (this.productCard && this.selectedRating != undefined) {
      console.log('selected preference: ', this.selectedSubPreference);
      if (this.selectedSubPreference) {
        const createReviewPayload: UserReviewRequest = {
          product: this.productCard.id,
          user_rating: this.selectedRating,
          user_review_text: this.reviewInputText || '',
          preference_level: this.selectedSubPreference.id,
        };

        console.log('creating review ', createReviewPayload);

        this.reviewService
          .createUserProductReview(createReviewPayload)
          .subscribe((data) => {
            if (this.productCard) {
              this.productCard.reviewed = true;
              this.productCard.bookmarked = false;
              this.reviewCreated.emit(this.productCard);
            }
            this.closeCard();
          });
      }
      // TODO: present the new review
      // get the newly created review from the review card, use the review details component
      // to present the card
    }
  }

  // saves the preferenceInput as the enum value to the component field
  savePreferenceInput(
    preferenceInputValue: ReviewPreference | undefined
  ): void {
    this.selectedPreference = preferenceInputValue;
    console.log(this.selectedPreference);
  }

  // saves the first step of the review process, which is selecting if they
  // liked the product or didn't (savePreferenceInput) and saves the review text
  saveReviewInput(
    text: string,
    preferenceInputValue: ReviewPreference | undefined
  ): void {
    this.reviewInputText = text;
    this.reviewStep = this.COMPARE_PRODUCTS_STEP;
    console.log('preference input value', preferenceInputValue);
    this.savePreferenceInput(preferenceInputValue);
    this.onPreferenceSelected();
    console.log(this.reviewInputText);
  }

  onPreferenceSelected() {
    console.log('on preference selected ', this.selectedPreference);
    if (this.selectedPreference) {
      this.reviewService.getSubPreferenceBuckets(this.selectedPreference);
      this.subPreferences$ = this.reviewService.subPreferences$;
      console.log('sub preference: ', this.reviewService.subPreferences);

      // get min and max values for the sliders
      const subPreferenceValueRange =
        this.reviewService.getSubPreferencesValueRange();
      if (
        subPreferenceValueRange.hasOwnProperty('min') &&
        subPreferenceValueRange.hasOwnProperty('max')
      ) {
        // set min and max
        this.minSubPreferenceValue = subPreferenceValueRange['min'];
        this.maxSubPreferenceValue = subPreferenceValueRange['max'];
      }

      // initialize slider with the recommendation value and
      // get the product lineup based on the recommendation
      if (
        this.productCard &&
        this.maxSubPreferenceValue != undefined &&
        this.minSubPreferenceValue != undefined
      ) {
        const matchPercentage = this.productCard.matchPercentage;
        if (matchPercentage == undefined) {
          this.selectedRating = this.minSubPreferenceValue;
        } else if (matchPercentage > this.maxSubPreferenceValue) {
          this.selectedRating = this.maxSubPreferenceValue;
        } else if (matchPercentage < this.minSubPreferenceValue) {
          this.selectedRating = this.minSubPreferenceValue;
        } else {
          this.selectedRating = matchPercentage;
        }

        this.reviewService
          .getProductLineup(this.selectedRating, this.productCard)
          .subscribe((lineup) => {
            this.productLineup = lineup;
          });

        // initialize the selected sub preference based off of the initial selected rating
        this.selectedSubPreference = this.reviewService.findBucketForRating(
          this.selectedRating
        );
      }
    }
  }

  onPreferenceSelectorChange(preference: ReviewPreference) {
    console.log('preference value: ', preference);
    if (this.selectedPreference !== preference) {
      this.selectedPreference = preference;
    }
    this.onPreferenceSelected();
  }

  onSliderChange(ratingValue: number) {
    // call the service to get the products before and after this value
    this.selectedRating = ratingValue;
    if (this.selectedRating != undefined && this.productCard) {
      this.reviewService
        .getProductLineup(this.selectedRating, this.productCard)
        .subscribe((lineup) => {
          this.productLineup = lineup;
        });
      this.selectedSubPreference =
        this.reviewService.findBucketForRating(ratingValue);
      console.log('selected sub preference: ', this.selectedSubPreference);
    }
  }

  closeCard(): void {
    this.isCardVisible = false;
    this.closeSelected.emit();
  }
}
