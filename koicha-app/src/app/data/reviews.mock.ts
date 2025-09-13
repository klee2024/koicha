import { UserReview } from '../models/review';

export const MOCK_REVIEWS: UserReview[] = [
  {
    id: 'rev-001',
    userId: 'user-123',
    productId: '1',
    userRanking: 5,
    userReviewText:
      'Rich umami with a pleasant cocoa note. Smooth and balanced.',
    countOfProductFinished: 3,
  },
  {
    id: 'rev-002',
    userId: 'user-456',
    productId: '1',
    userRanking: 4,
    userReviewText: 'Nice astringency; great daily drinker for usucha.',
    countOfProductFinished: 1,
  },
  {
    id: 'rev-003',
    userId: 'user-123',
    productId: '2',
    userRanking: 5,
    userReviewText:
      'Deep oceanic and savory profile. Excellent for koicha sessions.',
    countOfProductFinished: 2,
  },
  {
    id: 'rev-004',
    userId: 'user-789',
    productId: '2',
    userRanking: 3,
    userReviewText: 'Bold but a bit intense for my preference.',
    countOfProductFinished: 1,
  },
  {
    id: 'rev-005',
    userId: 'user-456',
    productId: '3',
    userRanking: 4,
    userReviewText: 'Verdant and clean finish; lovely aroma.',
    countOfProductFinished: 2,
  },
];
