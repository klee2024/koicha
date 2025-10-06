import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';

import { ProductMockService } from '../../services/product-mock.service';
import { TagsMockService } from '../../services/tags-mock.service';
import { PreparationsMockService } from '../../services/preparations-mock.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../utility/product-card/product-card.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { Preparation } from '../../models/preparation';
import { Tag } from '../../models/tag';
import { FeedComponent } from '../utility/feed/feed.component';

@Component({
  selector: 'app-recommendation-feed',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, FeedComponent],
  templateUrl: './recommendation-feed.component.html',
  styleUrl: './recommendation-feed.component.css',
})
export class RecommendationFeedComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  activeTagSlugs: string[] = [];
  activePrepSlug?: string = undefined;
  allTags: Tag[] = [];
  allPreps: Preparation[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductMockService,
    private tagService: TagsMockService,
    private prepService: PreparationsMockService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.allProducts = data;
      console.log('all products on init: ', this.allProducts);
      this.loading = false;

      // react to URL changes only after products are received
      this.route.queryParamMap.subscribe((queryParams) =>
        this.applyFiltersFromParams(queryParams)
      );
    });
    this.tagService.getTags().subscribe((data) => {
      this.allTags = data;
      console.log('all tags on init: ', this.allTags);
    });
    this.prepService.getPreparations().subscribe((data) => {
      this.allPreps = data;
      console.log('all preps on init: ', this.allPreps);
    });
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
    this.filteredProducts = products;
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

  setPreparation(slug?: string) {
    this.activePrepSlug = slug;
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

  trackById(index: number, item: { id: number | string }) {
    return item.id;
  }
}
