import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QUIZ_QUESTION_CLASSES } from './quiz-questions';

@Component({
  selector: 'app-first-time-quiz',
  imports: [CommonModule, FormsModule],
  templateUrl: './first-time-quiz.component.html',
  styleUrl: './first-time-quiz.component.css',
  standalone: true,
})
export class FirstTimeQuizComponent {
  quizQuestions = QUIZ_QUESTION_CLASSES;
  onSubmit() {
    console.log('the form has been submitted');
  }
}
