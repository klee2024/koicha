import { Component } from '@angular/core';
import { QuizQuestion, QuizAnswer } from '../../../models/Quiz';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../../services/quiz.service';
import { AuthService } from '../../../services/auth.service';
import { FirstTimeQuizIntroComponent } from '../first-time-quiz-intro/first-time-quiz-intro.component';
import {
  FormControl,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { FirstTimeQuizQuestionComponent } from '../first-time-quiz-question/first-time-quiz-question.component';
import { SignupSigninComponent } from '../../auth/signup-signin/signup-signin.component';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-first-time-quiz-page',
  standalone: true,
  imports: [
    CommonModule,
    FirstTimeQuizIntroComponent,
    ReactiveFormsModule,
    FirstTimeQuizQuestionComponent,
    SignupSigninComponent,
  ],
  templateUrl: './first-time-quiz-page.component.html',
  styleUrl: './first-time-quiz-page.component.css',
})
export class FirstTimeQuizPageComponent {
  private readonly quizSlug = 'first-time-quiz';

  quizQuestions: QuizQuestion[] = [];
  displayInstructions: boolean = true;
  quizQuestionIndex: number = -1;

  form?: FormGroup;

  get answersArray() {
    if (this.form) {
      return this.form.get('answers') as FormArray<FormControl<QuizAnswer>>;
    }
    return;
  }

  showSignup = false;

  constructor(
    private fb: FormBuilder,
    private quizQuestionService: QuizService,
    private authService: AuthService,
    private router: Router
  ) {
    this.fb.group({
      answers: this.fb.array<FormControl<QuizAnswer>>([]),
    });
  }

  ngOnInit() {
    // get the quiz questions from the questionnaire
    this.quizQuestionService.getQuiz(this.quizSlug).subscribe((quiz) => {
      // TODO: add error handling here in case the quiz does not have quiz questions
      this.quizQuestions = quiz.questions;
      const controls = this.quizQuestions.map((q) =>
        this.fb.control<QuizAnswer>(
          { question_id: q.id, option_id: null },
          { nonNullable: true }
        )
      );
      this.form = this.fb.group({
        answers: this.fb.array<FormControl<QuizAnswer>>(controls),
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
      // clear all answers when returning to intro
      this.answersArray?.controls.forEach((control, i) => {
        control.setValue({
          question_id: this.quizQuestions[i].id,
          option_id: null,
        });
      });
    }
  }

  onAnswerSelected(answerId: number) {
    // set the value to a form control
    if (this.answersArray && this.quizQuestionIndex > -1) {
      const currentQuestion = this.quizQuestions[this.quizQuestionIndex];
      this.answersArray.at(this.quizQuestionIndex).setValue({
        question_id: currentQuestion.id,
        option_id: answerId,
      });
    }
  }

  private submit() {
    if (!this.form || !this.answersArray || this.form.invalid) return;

    this.authService
      .isAuthenticated$()
      .pipe(take(1))
      .subscribe((isAuth) => {
        if (isAuth) {
          this.submitQuiz();
        } else {
          this.showSignup = true;
        }
      });
  }

  onSignupComplete() {
    this.showSignup = false;
    this.submitQuiz();
  }

  private submitQuiz() {
    if (!this.form || !this.answersArray) return;
    const payload = {
      answers: this.answersArray.value,
    };
    this.quizQuestionService.submitQuiz(this.quizSlug, payload).subscribe({
      next: () => this.router.navigate(['/taste-profile']),
      error: (err) => console.error('submit failed', err),
    });
  }
}
