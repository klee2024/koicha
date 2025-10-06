import { Routes } from '@angular/router';
import { RecommendationFeedComponent } from './components/recommendation-feed/recommendation-feed.component';
import { BookmarkShelfComponent } from './components/bookmark-shelf/bookmark-shelf.component';
import { TasteProfileComponent } from './components/taste-profile/taste-profile.component';
import { UserReviewsComponent } from './components/user-reviews/user-reviews.component';
import { FirstTimeQuizComponent } from './components/first-time-quiz/first-time-quiz.component';
import { TeaShelfPageComponent } from './components/tea-shelf-page/tea-shelf-page.component';
import { ReviewFeedComponent } from './components/review-feed/review-feed.component';

export const routes: Routes = [
  { path: 'explore', component: RecommendationFeedComponent },
  {
    path: 'tea-shelf',
    component: TeaShelfPageComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'bookmarks' },
      {
        path: 'bookmarks',
        component: BookmarkShelfComponent,
      },
      {
        path: 'reviews',
        component: ReviewFeedComponent,
      },
    ],
  },
  { path: 'taste-profile', component: TasteProfileComponent },
  { path: 'user-reviews', component: UserReviewsComponent },
  { path: 'taste-profile-quiz', component: FirstTimeQuizComponent },
];
