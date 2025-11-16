import { Preparation } from '../../../models/preparation';
import { Tag } from '../../../models/tag';

interface BaseProductCard {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  productUrl: string;
  preparation: Preparation;
  matchPercentage: number;
  tags: Tag[];
}

export interface RecommendationCard extends BaseProductCard {
  variant: 'recommendation';
}

export interface ReviewCard extends BaseProductCard {
  variant: 'review';
  userScore: number;
  userRanking: number;
  reviewText: string;
  reviewPreferenceValue: number; // converted based on the enum
  containersFinished?: number;
}

export type ProductCardData = RecommendationCard | ReviewCard;
