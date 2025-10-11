import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Preparation } from '../../../models/preparation';
import { CommonModule } from '@angular/common';
import { Tag } from '../../../models/tag';
import { UserProductsService } from '../../../services/user-products-mock.service';

@Component({
  selector: 'app-review-card',
  imports: [CommonModule],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css',
})
export class ReviewCardComponent {
  @Input() id!: string;
  @Input() productName!: string;
  @Input() productBrand!: string;
  @Input() preparation!: Preparation;
  @Input() productId!: string;
  @Input() imageUrl!: string;
  @Input() tags!: Tag[];
  @Input() productUrl!: string;
  @Input() ranking!: number;
  @Input() review!: string;
  @Input() countOfProductFinished!: number;
  @Input() exit: boolean = false;
  @Output() closed = new EventEmitter<void>();

  constructor(private userProductService: UserProductsService) {}

  trackById(index: number, item: { id: string }) {
    return item.id;
  }

  closeProductCard() {
    this.closed.emit();
  }
}
