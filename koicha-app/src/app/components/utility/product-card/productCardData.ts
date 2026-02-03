import { Preparation, Tag } from '../../../models/product';
import { ReviewSubPreference } from '../../../models/review-preference';

interface BaseProductCard {
  id: number;
  name: string;
  brand: string;
  image_url: string;
  product_url: string;
  preparation: Preparation;
  matchPercentage: number;
  tags: Tag[];
  bookmarked?: boolean;
  reviewed?: boolean;
}

export interface RecommendationCard extends BaseProductCard {
  variant: 'recommendation';
}

export interface ReviewCard extends BaseProductCard {
  variant: 'review';
  userScore: number;
  userRanking: number;
  reviewText: string;
  reviewPreferenceValue: ReviewSubPreference; // converted based on the enum
  containersFinished?: number;
}

export type ProductCardData = RecommendationCard | ReviewCard;
