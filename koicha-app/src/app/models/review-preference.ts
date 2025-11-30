// implemented in case the review preference text changes or new categories are added
// ex: {id: "reviewPreference1", reviewPreferenceName: "I liked it"}

// ===============================
// Main Buckets for Review Preference
// ===============================

export enum ReviewPreferenceBucket {
  Disliked = 'DISLIKED',
  Fine = 'FINE',
  Liked = 'LIKED',
}

// Numeric values on a 1–100 scale
// These are the "base" values for each bucket.
export enum ReviewPreferenceValue {
  Disliked = 20, // zone: 1–33
  Fine = 50, // zone: 34–66
  Liked = 80, // zone: 67–99
}

// The bucket config (for listing, labels, etc.)
export interface ReviewPreference {
  id: string; // e.g. 'reviewPreference.liked'
  bucket: string; // DISLIKED / FINE / LIKED
  label: string; // display text: "I liked it"
  value: number; // 20 / 50 / 80
  color: string; // color for UI styling
}

// ===============================
// Sub Preferences for Main Preference
// ===============================

// SUB-PREFERENCES
export enum DislikedSubPreferenceValue {
  ReallyDisliked = 10,
  Disliked = 20,
  SlightlyDisliked = 30,
}

export enum FineSubPreferenceValue {
  Meh = 40,
  Fine = 50,
  PrettyGood = 60,
}

export enum LikedSubPreferenceValue {
  Liked = 70, // "I liked it"
  ReallyLiked = 80, // "I really liked it"
  Loved = 90, // "I loved it"
}

export enum LikedSubPreference {
  Liked = 'LIKED',
  ReallyLiked = 'REALLY_LIKED',
  Loved = 'LOVED',
}

export enum DislikedSubPreference {
  ReallyDisliked = 'REALLY_DISLIKED',
  Disliked = 'DISLIKED',
  SlightlyDisliked = 'SLIGHTLY_DISLIKED',
}

export enum FineSubPreference {
  Meh = 'MEH',
  Fine = 'FINE',
  PrettyGood = 'PRETTY_GOOD',
}

// Config model for a sub-preference
export interface ReviewSubPreference {
  id: string; // e.g. 'subPref.loved'
  bucket: string;
  key: string; // Liked / ReallyLiked / Loved
  label: string; // display text
  value: number; // 70 / 80 / 90
}
