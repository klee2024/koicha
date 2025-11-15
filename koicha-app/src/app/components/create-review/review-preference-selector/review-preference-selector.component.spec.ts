import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPreferenceSelectorComponent } from './review-preference-selector.component';

describe('ReviewPreferenceSelectorComponent', () => {
  let component: ReviewPreferenceSelectorComponent;
  let fixture: ComponentFixture<ReviewPreferenceSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewPreferenceSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewPreferenceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
