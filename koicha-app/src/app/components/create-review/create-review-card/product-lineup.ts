export interface ProductLineup {
  productRanking: number;
  productName: string;
  productBrand: string;
  productRating: number;
  productPosition: 'before' | 'current' | 'after';
}
