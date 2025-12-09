import { Routes } from '@angular/router';
import { RecommendationFeedComponent } from './components/recommendation-feed/recommendation-feed.component';
import { BookmarkShelfComponent } from './components/bookmark-shelf/bookmark-shelf.component';
import { TeaShelfPageComponent } from './components/tea-shelf-page/tea-shelf-page.component';
import { ReviewedComponent } from './components/reviewed/reviewed.component';
import { TasteProfileDetailsComponent } from './components/taste-profile-page/taste-profile-details/taste-profile-details.component';
import { TasteProfileComponent } from './components/taste-profile-page/taste-profile/taste-profile.component';
import { FirstTimeQuizPageComponent } from './components/first-time-quiz/first-time-quiz-page/first-time-quiz-page.component';
import { SignupSigninComponent } from './components/auth/signup-signin/signup-signin.component';
import { provideExperimentalCheckNoChangesForDebug } from '@angular/core';

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
        component: ReviewedComponent,
      },
    ],
  },
  { path: 'taste-profile', component: TasteProfileComponent },
  { path: 'find-your-matcha', component: FirstTimeQuizPageComponent },
];
