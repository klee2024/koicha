import { Component, OnInit } from '@angular/core';
import { Product, Preparation, Tag } from '../../models/product';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { FeedComponent } from '../utility/feed/feed.component';
import { ProductCardData } from '../utility/product-card/productCardData';
import { CreateReviewCardComponent } from '../create-review/create-review-card/create-review-card.component';
import { UserProductsService } from '../../services/user-products-mock.service';
import { UserBookmark } from '../../models/bookmark';
import { Review } from '../../models/review';

@Component({
  selector: 'app-recommendation-feed',
  standalone: true,
  imports: [CommonModule, FeedComponent, CreateReviewCardComponent],
  templateUrl: './recommendation-feed.component.html',
  styleUrl: './recommendation-feed.component.css',
})
export class RecommendationFeedComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProductCards: ProductCardData[] = [];
  activeTagSlugs: string[] = [];
  activePrepSlug?: string = undefined;
  allTags: Tag[] = [];
  allPreps: Preparation[] = [];
  loading = true;
  bookmarkedProductIds = new Set<number>();
  reviewedProductIds = new Set<number>();

  productToReview?: ProductCardData;
  productToBookmark?: ProductCardData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userProductService: UserProductsService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      const products = data['products'] as Product[];
      const bookmarks = data['bookmarks'] as UserBookmark[];
      const reviews = data['reviews'] as Review[];

      this.allProducts = products;
      this.allTags = data['tags'] as Tag[];
      this.allPreps = data['preparations'] as Preparation[];
      this.bookmarkedProductIds = new Set(
        bookmarks.map((bookmark) => bookmark.product.id)
      );
      this.reviewedProductIds = new Set(
        reviews.map((review) => review.product.id)
      );
      this.loading = false;
    });

    this.route.queryParamMap.subscribe((queryParams) =>
      this.applyFiltersFromParams(queryParams)
    );
  }

  // FILTER BY TAGS AND QUERY PARAMS
  private applyFilters() {
    let products = this.allProducts;
    console.log('products: ', products);
    console.log('active tag slugs, ', this.activeTagSlugs);
    console.log('active prep slugs, ', this.activePrepSlug);
    if (this.activeTagSlugs.length) {
      products = products.filter((product) =>
        this.activeTagSlugs.every((slug) =>
          product.tags?.some((tag) => tag.slug === slug)
        )
      );
    }
    if (this.activePrepSlug) {
      products = products.filter(
        (product) => product.preparation?.slug === this.activePrepSlug
      );
    }
    console.log(products);
    this.filteredProductCards = products.map((product) =>
      this.mapToCard(product)
    );
  }

  private applyFiltersFromParams(queryParamMap: ParamMap) {
    this.activeTagSlugs = this.parseTagList(queryParamMap.get('tags'));
    this.activePrepSlug = this.cleanSlug(queryParamMap.get('prep'));
    this.applyFilters();
  }

  private parseTagList(param: string | null): string[] {
    if (!param) return [];
    return [
      ...new Set(
        param
          .split(',')
          .map((slug) => this.cleanSlug(slug))
          .filter(Boolean) as string[]
      ),
    ];
  }

  private cleanSlug(s: string | null): string | undefined {
    if (!s) return undefined;
    const slug = s.trim().toLowerCase();
    return slug.length ? slug : undefined;
  }

  // HANDLE FILTERS
  toggleTag(slug: string) {
    const s = new Set(this.activeTagSlugs);
    s.has(slug) ? s.delete(slug) : s.add(slug);
    this.activeTagSlugs = [...s];
    this.navigateWithFilters();
  }

  togglePreparation(slug?: string) {
    this.activePrepSlug == slug
      ? (this.activePrepSlug = undefined)
      : (this.activePrepSlug = slug);
    this.navigateWithFilters();
  }

  clearFilters() {
    this.activeTagSlugs = [];
    this.activePrepSlug = undefined;
    this.navigateWithFilters();
  }

  private navigateWithFilters() {
    const queryParams: any = {
      tags: this.activeTagSlugs.length ? this.activeTagSlugs.join(',') : null,
      prep: this.activePrepSlug ?? null,
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  mapToCard(product: Product): ProductCardData {
    return {
      id: product.id,
      name: product.name,
      brand: product.brand,
      image_url: product.image_url,
      product_url: product.product_url,
      preparation: product.preparation,
      tags: product.tags ?? [],
      matchPercentage: product.matchPercentage,
      bookmarked: this.bookmarkedProductIds.has(product.id),
      reviewed: this.reviewedProductIds.has(product.id),
      variant: 'recommendation',
    };
  }

  // CARD BUTTON CLICK HANDLERS
  onReviewProduct(product: ProductCardData) {
    this.productToReview = product;
    console.log('review product button works!');
  }

  onReviewCreated(product: ProductCardData) {
    const target = this.filteredProductCards.find(
      (card) => card.id === product.id
    );
    if (target) {
      target.reviewed = true;
      if (target.bookmarked) {
        target.bookmarked = false;
        this.userProductService
          .toggleBookmark(target.id)
          .subscribe(() => {});
      }
    }
  }

  onBookmarkProduct(product: ProductCardData) {
    this.productToBookmark = product;
    console.log(`bookmark product button works: ${product.id}!`);
    this.userProductService.toggleBookmark(product.id).subscribe((response) => {
      product.bookmarked = response.bookmarked;
      console.log('product bookmark result: ', response);
    });
  }

  closeReviewCard() {
    this.productToReview = undefined;
  }

  trackById(index: number, item: { id: number | string }) {
    return item.id;
  }
}
