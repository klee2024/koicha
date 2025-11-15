import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProductsService } from '../../../services/user-products-mock.service';
import { ProductCardContentComponent } from '../product-card-content/product-card-content.component';
import { ProductCardData, ReviewCard } from './productCardData';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, ProductCardContentComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  // TODO: consider if exit can be removed
  @Input() exit: boolean = false;
  @Input() productCardData?: ProductCardData = undefined;

  // TODO: rename reviewSelected so it is clear this is for presentational purposes
  @Output() reviewSelected = new EventEmitter<ReviewCard>();
  @Output() bookmarkProductId = new EventEmitter<string>();
  @Output() productToReview = new EventEmitter<ProductCardData>();

  constructor() {}

  // TODO: revisit this after component refactor
  addToBookmarks(productId: string) {
    // get the logged in user TODO: make this dynamic
    // this.userProductService
    //   .createUserBookmark('placeholder user id', this.id)
    //   .subscribe((data) => {
    //     console.log(`${id} added to saved products`);
    //   });
  }

  // TODO: consider deleting this
  addToUserTastedCount(userId: string, productId: string) {
    // this.userProductService
    //   .addToUserTasteCount('placeholder user id', this.id)
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
  }

  // TODO: replace with real values from inputs
  reviewProduct(userId: string, productId: string) {
    // this.userProductService
    //   .createUserProductReview('placeholder user id', this.id, {
    //     userId: 'placeholder',
    //     productId: this.id,
    //     userRanking: 0,
    //     userReviewText: 'testing',
    //   })
    //   .subscribe((data) => console.log(data));
  }

  trackById(index: number, item: { id: string }) {
    return item.id;
  }

  showProductReview() {
    console.log('open product review');
  }
}
