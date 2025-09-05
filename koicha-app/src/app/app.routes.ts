import { Routes } from '@angular/router';
import { RecommendationFeedComponent } from './components/recommendation-feed/recommendation-feed.component';
import { BookmarkShelfComponent } from './components/bookmark-shelf/bookmark-shelf.component';

export const routes: Routes = [
  { path: 'explore', component: RecommendationFeedComponent },
  { path: '', pathMatch: 'full', redirectTo: 'explore' },
  { path: 'tea-shelf', component: BookmarkShelfComponent },
];
