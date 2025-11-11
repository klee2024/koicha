import { Component } from '@angular/core';
import { UserProductsService } from '../../services/user-products-mock.service';
import { UserReview } from '../../models/review';
import { FeedComponent } from '../utility/feed/feed.component';
import { ProductCardData } from '../utility/product-card/productCardData';

@Component({
  selector: 'app-reviewed',
  standalone: true,
  imports: [FeedComponent],
  templateUrl: './reviewed.component.html',
  styleUrl: './reviewed.component.css',
})
export class ReviewedComponent {
  userReviews: ProductCardData[] = [];
  constructor(private reviewService: UserProductsService) {}

  ngOnInit() {
    // TODO: make the fetch dynamic by grabbing the logged in user
    this.reviewService.getUserProductReviews('user123').subscribe((data) => {
      this.userReviews = data.map((review) => this.mapToCard(review));
      console.log('user reviews have been saved: ', this.userReviews);
    });
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
