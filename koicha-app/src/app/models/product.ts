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
  id: number;
  name: string;
  brand: string;
  preparation: Preparation;
  matchPercentage: number;
  image_url: string;
  tags: Tag[];
  product_url: string;
}
