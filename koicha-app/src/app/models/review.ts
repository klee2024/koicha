export interface UserReview {
  id: string;
  userId: string;
  productId: string;
  userRanking: number;
  userReviewText: string;
  countOfProductFinished: number;
}
