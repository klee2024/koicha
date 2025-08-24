import { Tag } from './tag';
import { Preparation } from './preparation';

export interface Product {
  id: string;
  name: string;
  preparation: Preparation;
  matchPercentage: number;
  imageUrl: string;
  tags: Tag[];
  productUrl: string;
}
