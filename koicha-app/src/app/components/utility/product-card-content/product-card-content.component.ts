import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Preparation } from '../../../models/preparation';
import { Tag } from '../../../models/tag';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card-content',
  imports: [CommonModule],
  templateUrl: './product-card-content.component.html',
  styleUrl: './product-card-content.component.css',
})
export class ProductCardContentComponent {
  @Input() id!: string;
  @Input() name!: string;
  @Input() brand!: string;
  @Input() preparation!: Preparation;
  @Input() matchPercentage!: number;
  @Input() tags!: Tag[];
  @Input() productUrl!: string;
  @Input() variant: 'recommendation' | 'review' = 'recommendation';
  @Input() userRating!: number;
  @Input() userRanking!: number;
  @Output() closed = new EventEmitter<void>();

  trackById(index: number, item: { id: string }) {
    return item.id;
  }
}
