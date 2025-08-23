import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';

import { ProductMockService } from '../../services/product-mock.service';
import { CommonModule } from '@angular/common';
import { RecommendationCardComponent } from '../recommendation-card/recommendation-card.component';

@Component({
  selector: 'app-recommendation-feed',
  standalone: true,
  imports: [CommonModule, RecommendationCardComponent],
  templateUrl: './recommendation-feed.component.html',
  styleUrl: './recommendation-feed.component.css',
})
export class RecommendationFeedComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  constructor(private productService: ProductMockService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.loading = false;
    });
  }

  trackById(index: number, item: { id: number | string }) {
    return item.id;
  }
}
