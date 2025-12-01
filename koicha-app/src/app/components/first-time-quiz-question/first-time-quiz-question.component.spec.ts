import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTimeQuizQuestionComponent } from './first-time-quiz-question.component';

describe('FirstTimeQuizQuestionComponent', () => {
  let component: FirstTimeQuizQuestionComponent;
  let fixture: ComponentFixture<FirstTimeQuizQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstTimeQuizQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstTimeQuizQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
