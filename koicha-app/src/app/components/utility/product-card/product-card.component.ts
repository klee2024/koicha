import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tag } from '../../../models/tag';
import { Preparation } from '../../../models/preparation';
import { UserProductsService } from '../../../services/user-products-mock.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  productCardVisible: boolean = true;
  @Input() id!: string;
  @Input() name!: string;
  @Input() brand!: string;
  @Input() preparation!: Preparation;
  @Input() matchPercentage!: number;
  @Input() imageUrl!: string;
  @Input() tags!: Tag[];
  @Input() productUrl!: string;
  @Input() exit: boolean = false;
  @Output() closed = new EventEmitter<void>();

  constructor(private userProductService: UserProductsService) {}

  addToBookmarks(id: string) {
    // call a service to add this to the customer's bookmarks
    this.userProductService
      .createUserBookmark('placeholder user id', this.id)
      .subscribe((data) => {
        console.log(`${id} added to saved products`);
      });
  }

  addToUserTastedCount(userId: string, productId: string) {
    this.userProductService
      .addToUserTasteCount('placeholder user id', this.id)
      .subscribe((data) => {
        console.log(data);
      });
  }

  // TODO: replace with real values from inputs
  reviewProduct(userId: string, productId: string) {
    this.userProductService
      .createUserProductReview('placeholder user id', this.id, {
        userId: 'placeholder',
        productId: this.id,
        userRanking: 0,
        userReviewText: 'testing',
      })
      .subscribe((data) => console.log(data));
  }

  trackById(index: number, item: { id: string }) {
    return item.id;
  }

  closeProductCard() {
    this.productCardVisible = false;
    this.closed.emit();
  }
}
