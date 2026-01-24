export interface UserReviewRequest {
  productId: number;
  userRating: number;
  userReviewText: string | undefined;
}

// TODO: reorganize to move this out of the models class
