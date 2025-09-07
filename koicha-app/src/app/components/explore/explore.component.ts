import { Component } from '@angular/core';
import { FeedComponent } from '../utility/feed/feed.component';
import { ProductMockService } from '../../services/product-mock.service';
import { Product } from '../../models/product';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-explore',
  imports: [FeedComponent],
  standalone: true,
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css',
})
export class ExploreComponent {
  allProducts: Product[] = [];

  constructor(private productService: ProductMockService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.allProducts = data;
      console.log('all products on init: ', this.allProducts);
    });
  }
}
