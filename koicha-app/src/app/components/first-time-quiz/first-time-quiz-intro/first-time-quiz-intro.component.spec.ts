import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTimeQuizIntroComponent } from './first-time-quiz-intro.component';

describe('FirstTimeQuizIntroComponent', () => {
  let component: FirstTimeQuizIntroComponent;
  let fixture: ComponentFixture<FirstTimeQuizIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstTimeQuizIntroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstTimeQuizIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
