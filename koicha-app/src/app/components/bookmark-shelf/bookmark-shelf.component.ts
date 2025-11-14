import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { UserProductsService } from '../../services/user-products-mock.service';
import { CommonModule } from '@angular/common';
import { FeedComponent } from '../utility/feed/feed.component';
import { ProductCardData } from '../utility/product-card/productCardData';

@Component({
  selector: 'app-bookmark-shelf',
  standalone: true,
  imports: [CommonModule, FeedComponent],
  templateUrl: './bookmark-shelf.component.html',
  styleUrl: './bookmark-shelf.component.css',
})
export class BookmarkShelfComponent implements OnInit {
  userBookmarks: ProductCardData[] = [];
  productReviewId?: string;
  bookmarkProductId?: string;

  constructor(private userProductService: UserProductsService) {}
  ngOnInit() {
    // initialize the userBookmarks array on init - use this to pass down into the Product card
    this.userProductService
      .getUserBookmarks('placeholderUserId')
      .subscribe((data) => {
        this.userBookmarks = data.map((product) => this.mapToCard(product));
        console.log('all bookmarks on init', this.userBookmarks);
      });
  }

  trackById(index: number, item: { id: string }) {
    return item.id;
  }

  onReviewProduct(productId: string) {
    this.productReviewId = productId;
    console.log('review product button works!');
  }

  onBookmarkProduct(productId: string) {
    this.bookmarkProductId = productId;
    console.log(`bookmark product button works: ${productId}!`);
  }

  private mapToCard(product: Product): ProductCardData {
    return {
      id: product.id,
      name: product.name,
      brand: product.brand,
      imageUrl: product.imageUrl,
      productUrl: product.productUrl,
      preparation: product.preparation,
      tags: product.tags,
      matchPercentage: product.matchPercentage ?? 0,
      variant: 'recommendation',
    };
  }
}

// TODO: rename component so it's clear that this is bookmarks
