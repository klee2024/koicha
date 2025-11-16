import { Component, EventEmitter, Output } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { UserReview } from '../../../models/review';
import { ProductCardData, ReviewCard } from '../product-card/productCardData';
@Component({
  selector: 'app-feed',
  imports: [ProductCardComponent, CommonModule],
  standalone: true,
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {
  @Input() cards!: ProductCardData[];

  @Output() reviewSelected = new EventEmitter<ReviewCard>();
  @Output() productToReview = new EventEmitter<ProductCardData>();
  @Output() bookmarkProductId = new EventEmitter<ProductCardData>();

  onCardSelected(card: ReviewCard) {
    this.reviewSelected.emit(card);
  }

  onReviewProduct(product: ProductCardData) {
    this.productToReview.emit(product);
  }

  onBookmarkProduct(product: ProductCardData) {
    this.bookmarkProductId.emit(product);
  }

  trackById(index: number, item: { id: number | string }) {
    return item.id;
  }
}
