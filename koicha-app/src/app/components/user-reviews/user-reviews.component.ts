import { Component, OnInit } from '@angular/core';
import { UserProductsService } from '../../services/user-products-mock.service';
import { UserReview } from '../../models/review';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../utility/product-card/product-card.component';
import { ProductMockService } from '../../services/product-mock.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-reviews',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './user-reviews.component.html',
  styleUrl: './user-reviews.component.css',
  standalone: true,
})
export class UserReviewsComponent implements OnInit {
  selectedProduct$: Observable<Product | undefined> | undefined;
  userProductReviews: UserReview[] = [];
  private selectProductId$ = new BehaviorSubject<string | null>(null);
  constructor(
    private UserProductsService: UserProductsService,
    private ProductService: ProductMockService
  ) {}

  ngOnInit() {
    this.UserProductsService.getUserProductReviews(
      'placeholder user id'
    ).subscribe((data) => {
      this.userProductReviews = data;
      console.log("user's reviews: ", data);
    });

    this.selectedProduct$ = this.selectProductId$.pipe(
      switchMap((id) =>
        id ? this.ProductService.getProductsById(id) : of(undefined)
      )
    );
  }

  trackById(index: number, item: { id: string }) {
    return item.id;
  }

  showProductCard(productId: string) {
    this.selectProductId$.next(productId);
  }

  clearSelection() {
    this.selectProductId$.next(null);
  }
}
