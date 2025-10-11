import { Component } from '@angular/core';
import { ReviewFeedComponent } from '../utility/review-feed/review-feed.component';
import { UserProductsService } from '../../services/user-products-mock.service';
import { UserReview } from '../../models/review';
import { FeedComponent } from '../utility/feed/feed.component';
import { ReviewCardComponent } from '../utility/review-card/review-card.component';

@Component({
  selector: 'app-reviewed',
  standalone: true,
  imports: [ReviewFeedComponent],
  templateUrl: './reviewed.component.html',
  styleUrl: './reviewed.component.css',
})
export class ReviewedComponent {
  userReviews: UserReview[] = [];
  constructor(private reviewService: UserProductsService) {}

  ngOnInit() {
    // TODO: make the fetch dynamic by grabbing the user
    this.reviewService.getUserProductReviews('user123').subscribe((data) => {
      this.userReviews = data;
      console.log('user reviews have been saved: ', this.userReviews);
    });
  }

  trackById(index: number, item: { id: number | string }) {
    return item.id;
  }
}
