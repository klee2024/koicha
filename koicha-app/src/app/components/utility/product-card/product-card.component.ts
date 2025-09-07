import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tag } from '../../../models/tag';
import { Preparation } from '../../../models/preparation';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() id!: string;
  @Input() name!: string;
  @Input() preparation!: Preparation;
  @Input() matchPercentage!: number;
  @Input() imageUrl!: string;
  @Input() tags!: Tag[];
  @Input() productUrl!: string;

  trackById(index: number, item: { id: string }) {
    return item.id;
  }

  // TODO: build this service out
  addToBookmarks(id: string) {
    // call a service to add this to the customer's bookmarks
    console.log(`${id} added to saved products`);
  }
}
