import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTimeQuizPageComponent } from './first-time-quiz-page.component';

describe('FirstTimeQuizPageComponent', () => {
  let component: FirstTimeQuizPageComponent;
  let fixture: ComponentFixture<FirstTimeQuizPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstTimeQuizPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstTimeQuizPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
