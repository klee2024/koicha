import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule, NgFor } from '@angular/common';
import { Product } from '../../../models/product';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-feed',
  imports: [ProductCardComponent, CommonModule],
  standalone: true,
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {
  @Input() products!: Product[];

  trackById(index: number, item: { id: number | string }) {
    return item.id;
  }
}
