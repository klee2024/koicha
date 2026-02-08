import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, of, switchMap, take } from 'rxjs';
import { Product, Preparation, Tag } from '../models/product';
import { UserBookmark } from '../models/bookmark';
import { Review } from '../models/review';
import { ProductService } from '../services/product.service';
import { UserProductsService } from '../services/user-products-mock.service';
import { ReviewService } from '../services/review.service';
import { AuthService } from '../services/auth.service';

export const productsResolver: ResolveFn<Product[]> = () => {
  return inject(ProductService).getProducts();
};

export const bookmarksResolver: ResolveFn<UserBookmark[]> = () => {
  const authService = inject(AuthService);
  const userProductsService = inject(UserProductsService);

  return authService.isAuthenticated$().pipe(
    take(1),
    switchMap((isAuth) =>
      isAuth
        ? userProductsService.getUserBookmarks().pipe(catchError(() => of([])))
        : of([])
    )
  );
};

export const reviewsResolver: ResolveFn<Review[]> = () => {
  const authService = inject(AuthService);
  const reviewService = inject(ReviewService);

  return authService.isAuthenticated$().pipe(
    take(1),
    switchMap((isAuth) =>
      isAuth
        ? reviewService.getUserProductReviews().pipe(catchError(() => of([])))
        : of([])
    )
  );
};

export const tagsResolver: ResolveFn<Tag[]> = () => {
  return inject(ProductService).getTags();
};

export const preparationsResolver: ResolveFn<Preparation[]> = () => {
  return inject(ProductService).getPreparations();
};
