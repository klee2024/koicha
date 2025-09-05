import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../models/product';
import { BookmarksMockService } from '../../services/bookmarks-mock.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookmark-shelf',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './bookmark-shelf.component.html',
  styleUrl: './bookmark-shelf.component.css',
})
export class BookmarkShelfComponent implements OnInit {
  userBookmarks: Product[] = [];

  constructor(private bookmarksService: BookmarksMockService) {}
  ngOnInit() {
    // initialize the userBookmarks array on init - use this to pass down into the Product card
    this.bookmarksService
      .getBookmarks('placeholderUserId')
      .subscribe((data) => {
        this.userBookmarks = data;
        console.log('all bookmarks on init', this.userBookmarks);
      });
  }

  trackById(index: number, item: { id: string }) {
    return item.id;
  }
}
