import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Preparation } from '../../../models/preparation';
import { Tag } from '../../../models/tag';
import { UserProductsService } from '../../../services/user-products-mock.service';

@Component({
  selector: 'app-review-card',
  imports: [],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css',
})
export class ReviewCardComponent {
  productCardVisible: boolean = true;
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
    this.productCardVisible = false;
    this.closed.emit();
  }
}
