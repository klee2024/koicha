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
    // TODO: make the fetch dynamic by grabbing the user
    this.reviewService.getUserProductReviews('user123').subscribe((data) => {
      this.userReviews = data.map((product) => ({
        id: product.id,
        name: product.productName,
        brand: product.productBrand,
        imageUrl: product.productImageUrl,
        productUrl: product.productUrl,
        preparation: product.preparation,
        tags: product.tags,
        variant: 'review',
        userScore: product.userRating,
        userRanking: product.userRanking,
        reviewText: product.userReviewText,
      }));
      console.log('user reviews have been saved: ', this.userReviews);
    });
  }

  trackById(index: number, item: { id: number | string }) {
    return item.id;
  }
}
