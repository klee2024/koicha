import { Product } from './product';

export interface ProductCardViewModel {
  id: string;
  variant: 'recommendation' | 'rating' | 'review';
  product: Product;
  metrics?: { matchPercentage?: number; userScore?: number; ranking?: number };
  review?: { text?: string; containersFinished?: number };
  flags?: { exit?: boolean; bookmarked?: boolean };
}
