import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuizQuestion } from '../../../models/quizQuestion';
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
  @Input() control?: FormControl<string | null>;

  @Output() answerSelected = new EventEmitter<string>();
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  select(optionValue: string) {
    this.answerSelected.emit(optionValue);
  }
}
