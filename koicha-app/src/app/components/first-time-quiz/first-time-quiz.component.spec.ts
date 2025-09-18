import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTimeQuizComponent } from './first-time-quiz.component';

describe('FirstTimeQuizComponent', () => {
  let component: FirstTimeQuizComponent;
  let fixture: ComponentFixture<FirstTimeQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstTimeQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstTimeQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
