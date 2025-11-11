import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../utility/product-card/product-card.component';
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

  constructor(private userProductService: UserProductsService) {}
  ngOnInit() {
    // initialize the userBookmarks array on init - use this to pass down into the Product card
    this.userProductService
      .getUserBookmarks('placeholderUserId')
      .subscribe((data) => {
        this.userBookmarks = data.map((product) => ({
          id: product.id,
          name: product.name,
          brand: product.brand,
          imageUrl: product.imageUrl,
          productUrl: product.productUrl,
          preparation: product.preparation,
          tags: product.tags,
          matchPercentage: product.matchPercentage ?? 0,
          variant: 'recommendation',
        }));
        console.log('all bookmarks on init', this.userBookmarks);
      });
  }

  trackById(index: number, item: { id: string }) {
    return item.id;
  }
}

// TODO: rename component so it's clear that this is bookmarks
