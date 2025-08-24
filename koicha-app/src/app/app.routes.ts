import { Routes } from '@angular/router';
import { RecommendationFeedComponent } from './components/recommendation-feed/recommendation-feed.component';

export const routes: Routes = [
  { path: 'explore', component: RecommendationFeedComponent },
  { path: '', pathMatch: 'full', redirectTo: 'explore' },
];
