import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReviewCard } from '../utility/product-card/productCardData';
import { ProductCardContentComponent } from '../utility/product-card-content/product-card-content.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-details',
  imports: [ProductCardContentComponent, CommonModule],
  templateUrl: './review-details.component.html',
  styleUrl: './review-details.component.css',
})
export class ReviewDetailsComponent {
  @Input() selectedReview: ReviewCard | undefined;

  @Output() closed = new EventEmitter<boolean>();
}
