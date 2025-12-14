import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { UserProductsService } from '../../services/user-products-mock.service';
import { CommonModule } from '@angular/common';
import { FeedComponent } from '../utility/feed/feed.component';
import { ProductCardData } from '../utility/product-card/productCardData';
import { CreateReviewCardComponent } from '../create-review/create-review-card/create-review-card.component';
import { ProductService } from '../../services/product.service';
import { UserBookmark } from '../../models/bookmark';

@Component({
  selector: 'app-bookmark-shelf',
  standalone: true,
  imports: [CommonModule, FeedComponent, CreateReviewCardComponent],
  templateUrl: './bookmark-shelf.component.html',
  styleUrl: './bookmark-shelf.component.css',
})
export class BookmarkShelfComponent implements OnInit {
  userBookmarks: ProductCardData[] = [];
  productToReview?: ProductCardData;
  productToBookmark?: ProductCardData;

  constructor(
    private productService: ProductService,
    private userProductService: UserProductsService
  ) {}
  ngOnInit() {
    // initialize the userBookmarks array on init - use this to pass down into the Product card
    this.userProductService.getUserBookmarks().subscribe((data) => {
      this.userBookmarks = data.map((bookmark) => this.mapToCard(bookmark));
      console.log('all bookmarks on init', this.userBookmarks);
    });
  }

  trackById(index: number, item: { id: string }) {
    return item.id;
  }

  onReviewProduct(product: ProductCardData) {
    this.productToReview = product;
    console.log('review product button works!');
    // TODO: bring up the create review card component
  }

  onBookmarkProduct(product: ProductCardData) {
    this.productToBookmark = product;
    const productId = product.id;

    // TODO: add error handling
    this.userProductService.toggleBookmark(productId).subscribe((response) => {
      console.log('product bookmark result: ', response);
    });
  }

  closeReviewCard() {
    this.productToReview = undefined;
  }

  private mapToCard(bookmark: UserBookmark): ProductCardData {
    return {
      id: bookmark.product.id,
      name: bookmark.product.name,
      brand: bookmark.product.brand,
      image_url: bookmark.product.image_url,
      product_url: bookmark.product.product_url,
      preparation: bookmark.product.preparation,
      tags: bookmark.product.tags,
      matchPercentage: bookmark.product.matchPercentage ?? 0,
      variant: 'recommendation',
    };
  }
}
