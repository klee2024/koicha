export interface Preparation {
  id: string;
  slug: string;
  name: string;
}

export interface Tag {
  id: string;
  slug: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  preparation: Preparation;
  matchPercentage: number;
  imageUrl: string;
  tags: Tag[];
  productUrl: string;
}
