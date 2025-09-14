import { UserReview } from '../models/review';

export const MOCK_REVIEWS: UserReview[] = [
  {
    id: 'rev-001',
    userId: 'user-123',
    productId: '1',
    productName: 'Kiyona Matcha',
    productBrand: 'Kettl',
    userRanking: 5,
    userReviewText:
      'Rich umami with a pleasant cocoa note. Smooth and balanced.',
    countOfProductFinished: 3,
  },
  {
    id: 'rev-003',
    userId: 'user-123',
    productId: '2',
    productName: 'Kohata Matcha',
    productBrand: 'Kettl',
    userRanking: 5,
    userReviewText:
      'Deep oceanic and savory profile. Excellent for koicha sessions.',
    countOfProductFinished: 2,
  },
  {
    id: 'rev-005',
    userId: 'user-456',
    productId: '3',
    productName: 'Yamagumo Matcha',
    productBrand: 'Kettl',
    userRanking: 4,
    userReviewText: 'Verdant and clean finish; lovely aroma.',
    countOfProductFinished: 2,
  },
];
