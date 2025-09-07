import { Routes } from '@angular/router';
import { RecommendationFeedComponent } from './components/recommendation-feed/recommendation-feed.component';
import { BookmarkShelfComponent } from './components/bookmark-shelf/bookmark-shelf.component';
import { TasteProfileComponent } from './components/taste-profile/taste-profile.component';
import { ExploreComponent } from './components/explore/explore.component';

export const routes: Routes = [
  { path: 'recommended-for-you', component: RecommendationFeedComponent },
  { path: 'explore', component: ExploreComponent },
  { path: '', pathMatch: 'full', redirectTo: 'explore' },
  { path: 'tea-shelf', component: BookmarkShelfComponent },
  { path: 'taste-profile', component: TasteProfileComponent },
];
