import { Component, Input } from '@angular/core';
import { UserReview } from '../../../models/review';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { ReviewCardExpandedComponent } from '../../review-card-expanded/review-card-expanded.component';

@Component({
  selector: 'app-review-feed',
  imports: [ProductCardComponent, CommonModule, ReviewCardExpandedComponent],
  standalone: true,
  templateUrl: './review-feed.component.html',
  styleUrl: './review-feed.component.css',
})
export class ReviewFeedComponent {
  @Input() reviews!: UserReview[];
  @Input() showExpandedReview: boolean = false;
  selectedReview!: UserReview;

  trackById(index: number, item: { id: number | string }) {
    return item.id;
  }
}
