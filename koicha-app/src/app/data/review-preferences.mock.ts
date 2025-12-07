import {
  ReviewPreference,
  ReviewSubPreference,
} from '../models/review-preference';

// TODO: move color out of backend logic and into frontend UI logic

// Example: static config you can use in the UI
export const REVIEW_PREFERENCES: ReviewPreference[] = [
  {
    id: 'reviewPreference.disliked',
    bucket: 'DISLIKED',
    label: 'Not for me',
    value: 20,
  },
  {
    id: 'reviewPreference.fine',
    bucket: 'FINE',
    label: 'It was fine',
    value: 50,
  },
  {
    id: 'reviewPreference.liked',
    bucket: 'LIKED',
    label: 'I liked it',
    value: 80,
  },
];

export const LIKED_SUBPREFERENCES: ReviewSubPreference[] = [
  {
    id: 'subPref.liked',
    bucket: 'LIKED',
    key: 'LIKED',
    label: 'Liked',
    value: 70,
  },
  {
    id: 'subPref.reallyLiked',
    bucket: 'LIKED',
    key: 'REALLY_LIKED',
    label: 'Really liked',
    value: 80,
  },
  {
    id: 'subPref.loved',
    bucket: 'LIKED',
    key: 'LOVED',
    label: 'Loved',
    value: 90,
  },
];

export const DISLIKED_SUBPREFERENCES: ReviewSubPreference[] = [
  {
    id: 'subPref.reallyDisliked',
    bucket: 'DISLIKED',
    key: 'REALLY_DISLIKED',
    label: 'Really Disliked',
    value: 10,
  },
  {
    id: 'subPref.disliked',
    bucket: 'DISLIKED',
    key: 'DISLIKED',
    label: 'Disliked',
    value: 20,
  },
  {
    id: 'subPref.slightlyDisliked',
    bucket: 'DISLIKED',
    key: 'SLIGHTLY_DISLIKED',
    label: 'Slightly Disliked',
    value: 30,
  },
];

export const FINE_SUBPREFERENCES: ReviewSubPreference[] = [
  {
    id: 'subPref.meh',
    bucket: 'FINE',
    key: 'MEH',
    label: 'Meh',
    value: 40,
  },
  {
    id: 'subPref.fine',
    bucket: 'FINE',
    key: 'FINE',
    label: 'Fine',
    value: 50,
  },
  {
    id: 'subPref.Good',
    bucket: 'FINE',
    key: 'PRETTY_GOOD',
    label: 'Good',
    value: 60,
  },
];
