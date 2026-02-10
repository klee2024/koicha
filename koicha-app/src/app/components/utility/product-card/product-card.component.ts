import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProductsService } from '../../../services/user-products.service';
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
  @Input() exit: boolean = false;
  @Input() productCardData?: ProductCardData = undefined;
  @Input() productUserRanking?: number = undefined;

  @Output() reviewSelected = new EventEmitter<ReviewCard>();
  @Output() productToBookmark = new EventEmitter<ProductCardData>();
  @Output() productToReview = new EventEmitter<ProductCardData>();

  constructor() {}

  trackById(index: number, item: { id: string }) {
    return item.id;
  }
}
