// implemented in case the review preference text changes or new categories are added
// ex: {id: "reviewPreference1", reviewPreferenceName: "I liked it"}

export interface ReviewPreference {
  id: string;
  reviewPreferenceName: string;
  reviewPreferenceEnum: number;
}

// ascending order of preference
export enum ReviewPreferenceName {
  Disliked,
  Fine,
  Liked,
}
