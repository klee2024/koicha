import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProductsService } from '../../../services/user-products-mock.service';
import { ProductCardContentComponent } from '../product-card-content/product-card-content.component';
import { ProductCardData } from './productCardData';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, ProductCardContentComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() exit: boolean = false;

  @Input() variant: 'recommendation' | 'rating' | 'review' = 'recommendation';
  @Input() productCardData?: ProductCardData = undefined;

  @Output() closed = new EventEmitter<void>();

  constructor(private userProductService: UserProductsService) {}

  // TODO: revisit this after component refactor
  addToBookmarks(id: string) {
    // call a service to add this to the customer's bookmarks
    // this.userProductService
    //   .createUserBookmark('placeholder user id', this.id)
    //   .subscribe((data) => {
    //     console.log(`${id} added to saved products`);
    //   });
  }

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

  closeProductCard() {
    this.closed.emit();
  }

  showProductReview() {
    console.log('open product review');
  }
}
