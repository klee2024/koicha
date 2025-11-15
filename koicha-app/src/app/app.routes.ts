import { Routes } from '@angular/router';
import { RecommendationFeedComponent } from './components/recommendation-feed/recommendation-feed.component';
import { BookmarkShelfComponent } from './components/bookmark-shelf/bookmark-shelf.component';
import { TasteProfileDetailsComponent } from './components/taste-profile-details/taste-profile-details.component';
import { FirstTimeQuizComponent } from './components/first-time-quiz/first-time-quiz.component';
import { TeaShelfPageComponent } from './components/tea-shelf-page/tea-shelf-page.component';
import { ReviewedComponent } from './components/reviewed/reviewed.component';
import { TasteProfileComponent } from './components/taste-profile/taste-profile.component';

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
  { path: 'taste-profile-quiz', component: FirstTimeQuizComponent },
];
