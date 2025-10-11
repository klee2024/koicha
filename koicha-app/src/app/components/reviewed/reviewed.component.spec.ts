import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewedComponent } from './reviewed.component';

describe('ReviewedComponent', () => {
  let component: ReviewedComponent;
  let fixture: ComponentFixture<ReviewedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
