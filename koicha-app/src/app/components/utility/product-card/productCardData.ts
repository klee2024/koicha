import { Preparation } from '../../../models/preparation';
import { Tag } from '../../../models/tag';

interface BaseProductCard {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  productUrl: string;
  preparation: Preparation;
  tags: Tag[];
}

export interface RecommendationCard extends BaseProductCard {
  variant: 'recommendation';
  matchPercentage: number;
}

export interface ReviewCard extends BaseProductCard {
  variant: 'review';
  userScore: number;
  userRanking: number;
  reviewText: string;
  containersFinished?: number;
}

export type ProductCardData = RecommendationCard | ReviewCard;
