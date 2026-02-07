import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Product, Preparation, Tag } from '../models/product';
import { UserBookmark } from '../models/bookmark';
import { Review } from '../models/review';
import { ProductService } from '../services/product.service';
import { UserProductsService } from '../services/user-products-mock.service';
import { ReviewService } from '../services/review.service';

export const productsResolver: ResolveFn<Product[]> = () => {
  return inject(ProductService).getProducts();
};

export const bookmarksResolver: ResolveFn<UserBookmark[]> = () => {
  return inject(UserProductsService)
    .getUserBookmarks()
    .pipe(catchError(() => of([])));
};

export const reviewsResolver: ResolveFn<Review[]> = () => {
  return inject(ReviewService)
    .getUserProductReviews()
    .pipe(catchError(() => of([])));
};

export const tagsResolver: ResolveFn<Tag[]> = () => {
  return inject(ProductService).getTags();
};

export const preparationsResolver: ResolveFn<Preparation[]> = () => {
  return inject(ProductService).getPreparations();
};
