import { Component, EventEmitter, Output } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { UserReview } from '../../models/review';
import { FeedComponent } from '../utility/feed/feed.component';
import {
  ProductCardData,
  ReviewCard,
} from '../utility/product-card/productCardData';
import { ReviewDetailsComponent } from '../review-details/review-details.component';
import { CommonModule } from '@angular/common';
import { CreateReviewCardComponent } from '../create-review/create-review-card/create-review-card.component';
import { DropdownPopupComponent } from '../utility/dropdown-popup/dropdown-popup.component';

@Component({
  selector: 'app-reviewed',
  standalone: true,
  imports: [
    FeedComponent,
    ReviewDetailsComponent,
    CommonModule,
    CreateReviewCardComponent,
    DropdownPopupComponent,
  ],
  templateUrl: './reviewed.component.html',
  styleUrl: './reviewed.component.css',
})
export class ReviewedComponent {
  userReviews: ProductCardData[] = [];
  productToReview?: ProductCardData;
  selectedReview?: ReviewCard;
  productToBookmark?: ProductCardData;
  productsToCompare?: ProductCardData[];

  @Output() popupMessage = new EventEmitter<string>();

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    // TODO: make the fetch dynamic by grabbing the logged in user
    this.reviewService.getUserProductReviews('user123').subscribe((data) => {
      this.userReviews = data.map((review) => this.mapToCard(review));
      console.log('user reviews have been saved: ', this.userReviews);
    });
  }

  onReviewSelected(review: ReviewCard) {
    this.selectedReview = review;
  }

  onReviewProduct(product: ProductCardData) {
    this.productToReview = product;
    console.log('review product button works!');
    console.log(product);
  }

  onBookmarkProduct(product: ProductCardData) {
    this.productToBookmark = product;

    console.log(`bookmark product button works: ${product.id}!`);
  }

  // gets the list of products to compare based on the preference value the user selected
  // ex: if the user selected that they liked the product, get only the other products that
  // the user liked
  onGetProductsToCompare(reviewPreferenceValue: number) {
    this.reviewService
      .getUserProductReviewsByPreference(reviewPreferenceValue)
      .subscribe((data) => {
        this.productsToCompare = data.map((review) => this.mapToCard(review));
        console.log('got products to compare: ', this.productsToCompare);
      });
  }

  onSkipProductComparison() {
    console.log('skip product comparison');
  }

  onUndoProductComparison() {
    console.log('undo product comparison');
  }

  onProductComparisonTooTough() {
    console.log('product comparison too tough');
  }

  clearSelection() {
    this.selectedReview = undefined;
  }

  private mapToCard(review: UserReview): ProductCardData {
    return {
      id: review.id,
      name: review.productName,
      brand: review.productBrand,
      imageUrl: review.productImageUrl,
      productUrl: review.productUrl,
      preparation: review.preparation,
      tags: review.tags,
      variant: 'review',
      userScore: review.userRating,
      userRanking: review.userRanking,
      reviewText: review.userReviewText,
      matchPercentage: review.matchPercentage,
      reviewPreferenceValue: review.reviewPreferenceValue,
    };
  }

  trackById(index: number, item: { id: number | string }) {
    return item.id;
  }
}
