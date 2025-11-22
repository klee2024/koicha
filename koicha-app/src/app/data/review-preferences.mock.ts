import {
  LikedSubPreference,
  ReviewPreferenceBucket,
  ReviewSubPreference,
  ReviewPreferenceValue,
  LikedSubPreferenceValue,
  ReviewPreference,
  DislikedSubPreference,
  FineSubPreference,
} from '../models/review-preference';

// Example: static config you can use in the UI
export const REVIEW_PREFERENCES: ReviewPreference[] = [
  {
    id: 'reviewPreference.disliked',
    bucket: ReviewPreferenceBucket.Disliked,
    label: 'Not for me',
    value: ReviewPreferenceValue.Disliked,
  },
  {
    id: 'reviewPreference.fine',
    bucket: ReviewPreferenceBucket.Fine,
    label: 'It was fine',
    value: ReviewPreferenceValue.Fine,
  },
  {
    id: 'reviewPreference.liked',
    bucket: ReviewPreferenceBucket.Liked,
    label: 'I liked it',
    value: ReviewPreferenceValue.Liked,
  },
];

export const LIKED_SUBPREFERENCES: ReviewSubPreference[] = [
  {
    id: 'subPref.liked',
    bucket: ReviewPreferenceBucket.Liked,
    key: LikedSubPreference.Liked,
    label: 'I liked it',
    value: LikedSubPreferenceValue.Liked,
  },
  {
    id: 'subPref.reallyLiked',
    bucket: ReviewPreferenceBucket.Liked,
    key: LikedSubPreference.ReallyLiked,
    label: 'I really liked it',
    value: LikedSubPreferenceValue.ReallyLiked,
  },
  {
    id: 'subPref.loved',
    bucket: ReviewPreferenceBucket.Liked,
    key: LikedSubPreference.Loved,
    label: 'I loved it',
    value: LikedSubPreferenceValue.Loved,
  },
];

export const DISLIKED_SUBPREFERENCES: ReviewSubPreference[] = [
  {
    id: 'subPref.reallyDisliked',
    bucket: ReviewPreferenceBucket.Disliked,
    key: DislikedSubPreference.ReallyDisliked,
    label: 'Really Disliked',
    value: LikedSubPreferenceValue.Liked,
  },
  {
    id: 'subPref.disliked',
    bucket: ReviewPreferenceBucket.Disliked,
    key: DislikedSubPreference.Disliked,
    label: 'Disliked',
    value: LikedSubPreferenceValue.ReallyLiked,
  },
  {
    id: 'subPref.slightlyDisliked',
    bucket: ReviewPreferenceBucket.Disliked,
    key: DislikedSubPreference.SlightlyDisliked,
    label: 'Slightly Disliked',
    value: LikedSubPreferenceValue.Loved,
  },
];

export const FINE_SUBPREFERENCES: ReviewSubPreference[] = [
  {
    id: 'subPref.meh',
    bucket: ReviewPreferenceBucket.Fine,
    key: FineSubPreference.Meh,
    label: 'Meh',
    value: LikedSubPreferenceValue.Liked,
  },
  {
    id: 'subPref.fine',
    bucket: ReviewPreferenceBucket.Fine,
    key: FineSubPreference.Fine,
    label: 'Fine',
    value: LikedSubPreferenceValue.ReallyLiked,
  },
  {
    id: 'subPref.Good',
    bucket: ReviewPreferenceBucket.Fine,
    key: FineSubPreference.PrettyGood,
    label: 'Good',
    value: LikedSubPreferenceValue.Loved,
  },
];
