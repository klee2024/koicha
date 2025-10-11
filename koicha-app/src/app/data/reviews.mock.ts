import { UserReview } from '../models/review';

export const MOCK_REVIEWS: UserReview[] = [
  {
    id: 'rev-001',
    userId: 'user-123',
    preparation: { id: 'prep1', name: 'Usucha', slug: 'usucha' },
    tags: [
      { id: 'tag1', slug: 'astringent', label: 'astringent' },
      { id: 'tag2', slug: 'cocoa', label: 'cocoa' },
      { id: 'tag3', slug: 'nutty', label: 'nutty' },
    ],
    productId: '1',
    productName: 'Kiyona Matcha',
    productBrand: 'Kettl',
    userRanking: 5,
    userReviewText:
      'Rich umami with a pleasant cocoa note. Smooth and balanced.',
    countOfProductFinished: 3,
    productUrl:
      'https://kettl.co/products/kiyona-matcha?pr_prod_strat=e5_desc&pr_rec_id=a3ad54589&pr_rec_pid=8667352629498&pr_ref_pid=8098143666426&pr_seq=uniform',
  },
  {
    id: 'rev-003',
    userId: 'user-123',
    productId: '2',
    preparation: { id: 'prep2', slug: 'koicha', name: 'Koicha' },
    tags: [
      { id: 'tag4', slug: 'oceanic', label: 'oceanic' },
      { id: 'tag5', slug: 'savory', label: 'savory' },
      { id: 'tag6', slug: 'umami', label: 'umami' },
    ],
    productName: 'Kohata Matcha',
    productBrand: 'Kettl',
    userRanking: 5,
    userReviewText:
      'Deep oceanic and savory profile. Excellent for koicha sessions.',
    productUrl:
      'https://kettl.co/collections/matcha-green-tea/products/kohata-matcha-20g',
    countOfProductFinished: 2,
  },
  {
    id: 'rev-005',
    userId: 'user-456',
    preparation: { id: 'prep1', slug: 'koicha', name: 'Usucha' },
    tags: [
      { id: 'tag1', slug: 'astringent', label: 'astringent' },
      { id: 'tag7', slug: 'verdant', label: 'verdant' },
    ],
    productUrl:
      'https://kettl.co/products/yamagumo-matcha?_pos=5&_sid=fbb9e8347&_ss=r',
    productId: '3',
    productName: 'Yamagumo Matcha',
    productBrand: 'Kettl',
    userRanking: 4,
    userReviewText: 'Verdant and clean finish; lovely aroma.',
    countOfProductFinished: 2,
  },
];
