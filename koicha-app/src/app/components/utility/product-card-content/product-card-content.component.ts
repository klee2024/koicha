import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Preparation, Tag } from '../../../models/product';
import { CommonModule } from '@angular/common';
import { ProductCardData } from '../product-card/productCardData';

@Component({
  selector: 'app-product-card-content',
  imports: [CommonModule],
  templateUrl: './product-card-content.component.html',
  styleUrl: './product-card-content.component.css',
})
export class ProductCardContentComponent {
  @Input() productCardData!: ProductCardData;
  @Output() closed = new EventEmitter<void>();
  @Input() hideProductMetrics: boolean = false;

  trackById(index: number, item: { id: string }) {
    return item.id;
  }
}
