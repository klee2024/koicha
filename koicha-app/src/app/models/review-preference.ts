// implemented in case the review preference text changes or new categories are added
// ex: {id: "reviewPreference1", reviewPreferenceName: "I liked it"}

export interface ReviewPreference {
  id: string;
  reviewPreferenceEnum: number;
}

// ascending order of preference
enum ReviewPreferenceName {
  Disliked,
  Medium,
  Liked,
}
