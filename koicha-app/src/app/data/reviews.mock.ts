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
    userRanking: 1,
    userRating: 55,
    matchPercentage: 87,
    userReviewText:
      'Rich umami with a pleasant cocoa note. Smooth and balanced.',
    countOfProductFinished: 3,
    productUrl:
      'https://kettl.co/products/kiyona-matcha?pr_prod_strat=e5_desc&pr_rec_id=a3ad54589&pr_rec_pid=8667352629498&pr_ref_pid=8098143666426&pr_seq=uniform',
    productImageUrl:
      'https://kettl.co/cdn/shop/files/3591029d-cbe4-4bee-b85e-3ac3eb4dbee0_1680x.jpg?v=1755114175',
    reviewPreferenceKey: 'FINE',
    reviewPreferenceValue: 50,
    reviewSubPreferenceKey: 'FINE',
    reviewSubPreferenceValue: 50,
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
    userRanking: 2,
    userRating: 89,
    matchPercentage: 82,
    userReviewText:
      'Deep oceanic and savory profile. Excellent for koicha sessions.',
    productUrl:
      'https://kettl.co/collections/matcha-green-tea/products/kohata-matcha-20g',
    countOfProductFinished: 2,
    productImageUrl:
      'https://kettl.co/cdn/shop/files/4b86217c-e836-4027-a489-170dbe9514ae_1680x.jpg?v=1755022395',
    reviewPreferenceKey: 'LIKED',
    reviewPreferenceValue: 80,
    reviewSubPreferenceKey: 'REALLY_LIKED',
    reviewSubPreferenceValue: 80,
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
    userRanking: 1,
    userRating: 97,
    matchPercentage: 82,
    userReviewText: 'Verdant and clean finish; lovely aroma.',
    countOfProductFinished: 2,
    productImageUrl:
      'https://kettl.co/cdn/shop/files/2a9f4b9a-5227-4211-b208-83f94887f5c4_1680x.jpg?v=1752611694',
    reviewPreferenceKey: 'LIKED',
    reviewPreferenceValue: 80,
    reviewSubPreferenceKey: 'LOVED',
    reviewSubPreferenceValue: 90,
  },
];
