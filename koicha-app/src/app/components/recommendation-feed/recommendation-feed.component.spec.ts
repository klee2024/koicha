import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationFeedComponent } from './recommendation-feed.component';

describe('RecommendationFeedComponent', () => {
  let component: RecommendationFeedComponent;
  let fixture: ComponentFixture<RecommendationFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendationFeedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecommendationFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
