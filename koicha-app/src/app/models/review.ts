import { Tag, Preparation } from './product';

export interface UserReview {
  id: string;
  // product values
  userId: string;
  preparation: Preparation;
  tags: Tag[];
  productId: string;
  productName: string;
  productBrand: string;
  userReviewText: string;
  productUrl: string;
  productImageUrl: string;
  matchPercentage: number;
  // review values
  reviewPreferenceKey: string; // enum from the backend
  reviewPreferenceValue: number; // enum from the backend
  reviewSubPreferenceKey: string; // enum from the backend
  reviewSubPreferenceValue: number; // enum from the backend
  userRating: number;
  userRanking: number;
  // TODO: post-mvp
  countOfProductFinished?: number;
}
