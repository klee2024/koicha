import { Component } from '@angular/core';
import { QuizQuestion } from '../../models/quizQuestion';
import { CommonModule } from '@angular/common';
import { FirstTimeQuizService } from '../../services/first-time-quiz.service';
import { FirstTimeQuizIntroComponent } from '../first-time-quiz-intro/first-time-quiz-intro.component';

@Component({
  selector: 'app-first-time-quiz-page',
  standalone: true,
  imports: [CommonModule, FirstTimeQuizIntroComponent],
  templateUrl: './first-time-quiz-page.component.html',
  styleUrl: './first-time-quiz-page.component.css',
})
export class FirstTimeQuizPageComponent {
  readonly INSTRUCTIONS_STEP = 'instructions';
  readonly QUESTIONS_STEP = 'questions';
  quizQuestions: QuizQuestion[] = [];
  displayInstructions: boolean = true;
  quizStep: 'instructions' | 'questions' = 'instructions';

  constructor(private quizQuestionService: FirstTimeQuizService) {}

  ngOnInit() {
    // get the quiz questions from the questionnaire
    this.quizQuestionService.getQuizQuestions().subscribe((data) => {
      this.quizQuestions = data;
      console.log('quiz questions retrieved: ', this.quizQuestions);
    });
  }

  // TODO: orchestrate the form group in this parent container
  // keep adding to this form group
  // ask chat regarding the architecture - if it makes sense to have a child component
  // that handles the quiz question
}
