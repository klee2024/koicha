import { Component, EventEmitter, Output } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { Review, UserReview } from '../../models/review';
import { FeedComponent } from '../utility/feed/feed.component';
import {
  ProductCardData,
  ReviewCard,
} from '../utility/product-card/productCardData';
import { ReviewDetailsComponent } from '../review-details/review-details.component';
import { CommonModule } from '@angular/common';
import { CreateReviewCardComponent } from '../create-review/create-review-card/create-review-card.component';
import { DropdownPopupComponent } from '../utility/dropdown-popup/dropdown-popup.component';
import { AuthService } from '../../services/auth.service';

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
  loading = true;
  productToReview?: ProductCardData;
  selectedReview?: ReviewCard;
  productToBookmark?: ProductCardData;
  productsToCompare?: ProductCardData[];

  @Output() popupMessage = new EventEmitter<string>();

  constructor(
    private reviewService: ReviewService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.reviewService.getUserProductReviews().subscribe((data) => {
      this.userReviews = data.map((review) => this.mapToCard(review));
      this.loading = false;
    });
  }

  onReviewSelected(review: ReviewCard) {
    this.selectedReview = review;
  }

  onReviewProduct(product: ProductCardData) {
    this.productToReview = product;
  }

  onReviewCreated(product: ProductCardData) {
    const target = this.userReviews.find((card) => card.id === product.id);
    if (target) {
      target.reviewed = true;
      target.bookmarked = false;
    }
  }

  onBookmarkProduct(product: ProductCardData) {
    this.productToBookmark = product;
  }

  closeReviewCard() {
    this.productToReview = undefined;
  }

  clearSelection() {
    this.selectedReview = undefined;
  }

  private mapToCard(review: Review): ProductCardData {
    return {
      id: review.id,
      name: review.product.name,
      brand: review.product.brand,
      image_url: review.product.image_url,
      product_url: review.product.product_url,
      preparation: review.product.preparation,
      tags: review.product.tags,
      variant: 'review',
      reviewed: true,
      userScore: review.user_rating,
      // TODO: depracate this, this should be calculated based off of the backend ordering
      userRanking: review.user_ranking,
      reviewText: review.user_review_text,
      // TODO POST-MVP: determine how to get or join match percentage on the backend for reviews
      matchPercentage: undefined,
      // TODO: refactor for review sub preference value
      reviewPreferenceValue: review.preference_level,
    };
  }

  trackById(index: number, item: { id: number }) {
    return item.id;
  }
}
