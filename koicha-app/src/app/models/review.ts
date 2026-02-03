import { Tag, Preparation, Product } from './product';
import { ReviewSubPreference } from './review-preference';

// TODO: depracate this model once refactored
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
  matchPercentage?: number;
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

export interface Review {
  id: number;
  user: number;
  product: Product;
  user_rating: number;
  user_ranking: number;
  user_review_text: string;
  preference_level: ReviewSubPreference;
}

export interface UserReviewRequest {
  product: number;
  user_rating: number;
  user_review_text: string | undefined;
  preference_level: number;
}
