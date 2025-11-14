import { Component } from '@angular/core';
import { UserProductsService } from '../../services/user-products-mock.service';
import { UserReview } from '../../models/review';
import { FeedComponent } from '../utility/feed/feed.component';
import {
  ProductCardData,
  ReviewCard,
} from '../utility/product-card/productCardData';
import { ReviewDetailsComponent } from '../review-details/review-details.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviewed',
  standalone: true,
  imports: [FeedComponent, ReviewDetailsComponent, CommonModule],
  templateUrl: './reviewed.component.html',
  styleUrl: './reviewed.component.css',
})
export class ReviewedComponent {
  userReviews: ProductCardData[] = [];
  selectedReview?: ReviewCard;
  productReviewId?: string;
  bookmarkProductId?: string;

  constructor(private reviewService: UserProductsService) {}

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

  onReviewProduct(productId: string) {
    this.productReviewId = productId;
    console.log('review product button works!');
  }

  onBookmarkProduct(productId: string) {
    this.bookmarkProductId = productId;
    console.log(`bookmark product button works: ${productId}!`);
  }

  // TODO: output productId to new child element that will handle the review
  onReviewProductService(userId: string, productId: string) {
    this.reviewService
      .createUserProductReview('placeholder user id', productId, {
        userId: 'placeholder',
        productId: productId,
        userRanking: 0,
        userReviewText: 'testing',
      })
      .subscribe((data) => console.log(data));
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
    };
  }

  trackById(index: number, item: { id: number | string }) {
    return item.id;
  }
}
