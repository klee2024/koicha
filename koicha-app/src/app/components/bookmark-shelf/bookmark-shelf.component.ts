import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../utility/product-card/product-card.component';
import { Product } from '../../models/product';
import { UserProductsService } from '../../services/user-products-mock.service';
import { CommonModule } from '@angular/common';
import { FeedComponent } from '../utility/feed/feed.component';

@Component({
  selector: 'app-bookmark-shelf',
  standalone: true,
  imports: [ProductCardComponent, CommonModule, FeedComponent],
  templateUrl: './bookmark-shelf.component.html',
  styleUrl: './bookmark-shelf.component.css',
})
export class BookmarkShelfComponent implements OnInit {
  userBookmarks: Product[] = [];

  constructor(private userProductService: UserProductsService) {}
  ngOnInit() {
    // initialize the userBookmarks array on init - use this to pass down into the Product card
    this.userProductService
      .getUserBookmarks('placeholderUserId')
      .subscribe((data) => {
        this.userBookmarks = data;
        console.log('all bookmarks on init', this.userBookmarks);
      });
  }

  trackById(index: number, item: { id: string }) {
    return item.id;
  }
}
