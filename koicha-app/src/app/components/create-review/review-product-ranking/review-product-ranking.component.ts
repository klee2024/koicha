import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductCardData } from '../../utility/product-card/productCardData';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-product-ranking',
  imports: [CommonModule],
  templateUrl: './review-product-ranking.component.html',
  styleUrl: './review-product-ranking.component.css',
})
export class ReviewProductRankingComponent {
  @Input() productCurrentlyReviewing?: ProductCardData;
  @Input() productToCompare?: ProductCardData;

  // pass this all the way up for review to get the new product from the ranking service
  @Output() productSelected? = new EventEmitter<ProductCardData>();
  @Output() undoSelected = new EventEmitter<void>();
  @Output() tooToughSelected = new EventEmitter<void>();
  @Output() skipSelected = new EventEmitter<void>();

  // TODO: how do I keep track of both the current product and the product it is being compared to
  // in the service?
  onSelectProduct(selectedProduct: ProductCardData) {
    this.productSelected?.emit(selectedProduct);
  }
}
