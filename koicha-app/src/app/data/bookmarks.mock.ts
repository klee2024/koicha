import { Product } from '../models/product';

export const MOCK_BOOKMARKS: Product[] = [
  {
    id: '1',
    name: 'Kiyona Matcha',
    brand: 'Kettl',
    preparation: { id: 'prep1', name: 'Usucha', slug: 'usucha' },
    matchPercentage: 87,
    tags: [
      { id: 'tag1', slug: 'astringent', name: 'astringent' },
      { id: 'tag2', slug: 'cocoa', name: 'cocoa' },
      { id: 'tag3', slug: 'nutty', name: 'nutty' },
    ],
    imageUrl:
      'https://kettl.co/cdn/shop/files/3591029d-cbe4-4bee-b85e-3ac3eb4dbee0_1680x.jpg?v=1755114175',
    productUrl:
      'https://kettl.co/products/kiyona-matcha?pr_prod_strat=e5_desc&pr_rec_id=a3ad54589&pr_rec_pid=8667352629498&pr_ref_pid=8098143666426&pr_seq=uniform',
  },
  {
    id: '3',
    name: 'Yamagumo Matcha',
    brand: 'Kettl',
    preparation: { id: 'prep1', slug: 'koicha', name: 'Usucha' },
    matchPercentage: 82,
    tags: [
      { id: 'tag1', slug: 'astringent', name: 'astringent' },
      { id: 'tag7', slug: 'verdant', name: 'verdant' },
    ],
    imageUrl:
      'https://kettl.co/cdn/shop/files/2a9f4b9a-5227-4211-b208-83f94887f5c4_1680x.jpg?v=1752611694',
    productUrl:
      'https://kettl.co/products/yamagumo-matcha?_pos=5&_sid=fbb9e8347&_ss=r',
  },
];
