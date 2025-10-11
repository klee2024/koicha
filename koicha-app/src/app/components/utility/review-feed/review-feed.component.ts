import { Component, Input } from '@angular/core';
import { UserReview } from '../../../models/review';
import { ReviewCardComponent } from '../review-card/review-card.component';

@Component({
  selector: 'app-review-feed',
  imports: [ReviewCardComponent],
  templateUrl: './review-feed.component.html',
  styleUrl: './review-feed.component.css',
})
export class ReviewFeedComponent {
  @Input() reviews!: UserReview[];

  trackById(index: number, item: { id: number | string }) {
    return item.id;
  }
}
