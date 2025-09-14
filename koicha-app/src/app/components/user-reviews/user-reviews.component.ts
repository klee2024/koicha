import { Component, OnInit } from '@angular/core';
import { UserProductsService } from '../../services/user-products-mock.service';
import { UserReview } from '../../models/review';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-reviews',
  imports: [CommonModule],
  templateUrl: './user-reviews.component.html',
  styleUrl: './user-reviews.component.css',
  standalone: true,
})
export class UserReviewsComponent implements OnInit {
  userProductReviews: UserReview[] = [];
  constructor(private UserProductsService: UserProductsService) {}

  ngOnInit() {
    this.UserProductsService.getUserProductReviews(
      'placeholder user id'
    ).subscribe((data) => {
      this.userProductReviews = data;
      console.log("user's reviews: ", data);
    });
  }

  trackById(index: number, item: { id: string }) {
    return item.id;
  }
}
