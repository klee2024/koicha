import { Component } from '@angular/core';
import { QuizQuestion } from '../../../models/quizQuestion';
import { CommonModule } from '@angular/common';
import { FirstTimeQuizService } from '../../../services/first-time-quiz.service';
import { FirstTimeQuizIntroComponent } from '../first-time-quiz-intro/first-time-quiz-intro.component';
import {
  FormControl,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { FirstTimeQuizQuestionComponent } from '../first-time-quiz-question/first-time-quiz-question.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-time-quiz-page',
  standalone: true,
  imports: [
    CommonModule,
    FirstTimeQuizIntroComponent,
    ReactiveFormsModule,
    FirstTimeQuizQuestionComponent,
  ],
  templateUrl: './first-time-quiz-page.component.html',
  styleUrl: './first-time-quiz-page.component.css',
})
export class FirstTimeQuizPageComponent {
  quizQuestions: QuizQuestion[] = [];
  displayInstructions: boolean = true;
  quizQuestionIndex: number = -1;

  form?: FormGroup;

  get answersArray() {
    if (this.form) {
      return this.form.get('answers') as FormArray<FormControl<string | null>>;
    }
    return;
  }

  constructor(
    private fb: FormBuilder,
    private quizQuestionService: FirstTimeQuizService,
    private router: Router
  ) {
    this.fb.group({
      answers: this.fb.array<FormControl<string | null>>([]),
    });
  }

  ngOnInit() {
    // get the quiz questions from the questionnaire
    this.quizQuestionService.getQuizQuestions().subscribe((data) => {
      this.quizQuestions = data;
      const controls = this.quizQuestions.map(() =>
        this.fb.control<string | null>(null)
      );
      this.form = this.fb.group({
        answers: this.fb.array<FormControl<string | null>>(controls),
      });
    });
  }

  startQuiz() {
    this.quizQuestionIndex = 0;
  }

  next() {
    if (!this.answersArray || this.quizQuestionIndex < 0) {
      return;
    }
    const currentControl = this.answersArray.at(this.quizQuestionIndex);
    if (!currentControl?.value) {
      return;
    }
    this.quizQuestionIndex += 1;
    if (this.quizQuestionIndex == this.quizQuestions.length) {
      this.submit();
    }
  }

  back() {
    if (this.quizQuestionIndex > -1) {
      this.quizQuestionIndex -= 1;
    }
    if (this.quizQuestionIndex == -1) {
      // clear the first answer
      this.answersArray?.at(0).setValue(null);
    }
  }

  onAnswerSelected(answerValue: string) {
    // set the value to a form control
    if (this.answersArray && this.quizQuestionIndex > -1) {
      this.answersArray.at(this.quizQuestionIndex).setValue(answerValue);
    }
  }

  private submit() {
    if (this.form && this.answersArray) {
      if (this.form.invalid) return;
      const payload = {
        answers: this.answersArray.value,
      };
      this.quizQuestionService.submitFirstTimeQuiz('user123', payload);
      this.router.navigate(['/taste-profile']);
    }
  }
}
