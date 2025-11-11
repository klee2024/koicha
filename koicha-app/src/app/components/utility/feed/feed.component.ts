import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { UserReview } from '../../../models/review';
import { ProductCardData } from '../product-card/productCardData';
@Component({
  selector: 'app-feed',
  imports: [ProductCardComponent, CommonModule],
  standalone: true,
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {
  @Input() cards!: ProductCardData[];

  trackById(index: number, item: { id: number | string }) {
    return item.id;
  }
}
