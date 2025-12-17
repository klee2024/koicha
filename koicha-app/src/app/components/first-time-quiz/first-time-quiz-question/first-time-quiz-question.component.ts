import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuizAnswer, QuizQuestion } from '../../../models/Quiz';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-first-time-quiz-question',
  imports: [CommonModule],
  templateUrl: './first-time-quiz-question.component.html',
  styleUrl: './first-time-quiz-question.component.css',
})
export class FirstTimeQuizQuestionComponent {
  @Input() question?: QuizQuestion;
  @Input() control?: FormControl<QuizAnswer>;
  @Input() lastQuestion?: boolean = false;

  @Output() answerSelected = new EventEmitter<number>();
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  select(optionId: number) {
    this.answerSelected.emit(optionId);
  }
}
