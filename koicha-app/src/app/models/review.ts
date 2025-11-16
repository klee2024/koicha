import { Preparation } from './preparation';
import { Tag } from './tag';

export interface UserReview {
  id: string;
  userId: string;
  preparation: Preparation;
  tags: Tag[];
  productId: string;
  productName: string;
  productBrand: string;
  userRanking: number;
  userRating: number;
  userReviewText: string;
  productUrl: string;
  countOfProductFinished: number;
  productImageUrl: string;
  matchPercentage: number;
  reviewPreferenceValue: number; // enum from the backend
}
