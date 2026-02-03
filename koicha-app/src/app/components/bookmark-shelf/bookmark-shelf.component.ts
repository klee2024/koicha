import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { UserProductsService } from '../../services/user-products-mock.service';
import { CommonModule } from '@angular/common';
import { FeedComponent } from '../utility/feed/feed.component';
import { ProductCardData } from '../utility/product-card/productCardData';
import { CreateReviewCardComponent } from '../create-review/create-review-card/create-review-card.component';
import { ProductService } from '../../services/product.service';
import { UserBookmark } from '../../models/bookmark';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bookmark-shelf',
  standalone: true,
  imports: [CommonModule, FeedComponent, CreateReviewCardComponent],
  templateUrl: './bookmark-shelf.component.html',
  styleUrl: './bookmark-shelf.component.css',
})
export class BookmarkShelfComponent implements OnInit {
  userBookmarks: ProductCardData[] = [];
  loading = true;
  productToReview?: ProductCardData;
  productToBookmark?: ProductCardData;

  constructor(
    private productService: ProductService,
    private userProductService: UserProductsService,
    public authService: AuthService
  ) {}
  ngOnInit() {
    // initialize the userBookmarks array on init - use this to pass down into the Product card
    this.userProductService.getUserBookmarks().subscribe((data) => {
      this.userBookmarks = data.map((bookmark) => this.mapToCard(bookmark));
      this.loading = false;
      console.log('all bookmarks on init', this.userBookmarks);
    });
  }

  trackById(index: number, item: { id: string }) {
    return item.id;
  }

  onReviewProduct(product: ProductCardData) {
    this.productToReview = product;
  }

  onReviewCreated(product: ProductCardData) {
    const target = this.userBookmarks.find((card) => card.id === product.id);
    if (target) {
      target.reviewed = true;
      if (target.bookmarked) {
        target.bookmarked = false;
        this.userProductService.toggleBookmark(target.id).subscribe(() => {});
      }
      this.userBookmarks = this.userBookmarks.filter(
        (card) => card.id !== product.id
      );
    }
  }

  onBookmarkProduct(product: ProductCardData) {
    this.productToBookmark = product;
    const productId = product.id;

    this.userProductService
      .toggleBookmark(productId)
      // handles the response when the product is bookmarked:true or bookmarked:false
      // so the UI handles this responsively without a page refresh
      .subscribe(({ bookmarked }) => {
        product.bookmarked = bookmarked;
        if (bookmarked) {
          const exists = this.userBookmarks.some(
            (bookmark) => bookmark.id === productId
          );
          // if the product does not exist in the user's bookmarks already, then add it to the user's bookmark array
          if (!exists) {
            this.userBookmarks = [...this.userBookmarks, product];
          }
          // if the product does exist in the user's bookmarks already, remove it since the product is being unbookmarked
        } else {
          this.userBookmarks = this.userBookmarks.filter(
            (bookmark) => bookmark.id !== productId
          );
        }
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
      matchPercentage: bookmark.product.matchPercentage,
      bookmarked: true,
      variant: 'recommendation',
    };
  }
}
