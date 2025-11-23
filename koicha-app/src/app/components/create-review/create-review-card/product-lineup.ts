export interface ProductLineup {
  userRanking: number;
  productName: string;
  productBrand: string;
  productRating: number;
  productPosition: 'before' | 'current' | 'after';
}
