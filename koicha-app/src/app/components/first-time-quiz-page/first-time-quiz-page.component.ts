import { Component } from '@angular/core';
import { QuizQuestion } from '../../models/quizQuestion';
import { CommonModule } from '@angular/common';
import { FirstTimeQuizService } from '../../services/first-time-quiz.service';
import { FirstTimeQuizIntroComponent } from '../first-time-quiz-intro/first-time-quiz-intro.component';
import {
  FormControl,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { FirstTimeQuizQuestionComponent } from '../first-time-quiz-question/first-time-quiz-question.component';

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
    private quizQuestionService: FirstTimeQuizService
  ) {
    this.fb.group({
      answers: this.fb.array<FormControl<string | null>>([]),
    });
  }

  ngOnInit() {
    // get the quiz questions from the questionnaire
    this.quizQuestionService.getQuizQuestions().subscribe((data) => {
      this.quizQuestions = data;
      console.log('quiz questions retrieved: ', this.quizQuestions);
      const controls = this.quizQuestions.map(() =>
        this.fb.control<string | null>(null)
      );
      this.form = this.fb.group({
        answers: this.fb.array<FormControl<string | null>>(controls),
      });
      console.log('form ', this.form);
    });
  }

  startQuiz() {
    this.quizQuestionIndex = 0;
  }

  next() {
    console.log('next selected');
    this.quizQuestionIndex += 1;
    if (this.quizQuestionIndex == this.quizQuestions.length) {
      // TODO: submit the form;
      this.submit();
    }
  }

  back() {
    if (this.quizQuestionIndex > -1) {
      this.quizQuestionIndex -= 1;
    }
  }

  onAnswerSelected(answerValue: string) {
    // set the value to a form control
    if (this.answersArray && this.quizQuestionIndex > -1) {
      this.answersArray.at(this.quizQuestionIndex).setValue(answerValue);
    }
  }

  private submit() {
    // TODO: Fix the form controls
    console.log('attempting to submit first time quiz');
    console.log(this.form);
    console.log(this.answersArray);
    if (this.form && this.answersArray) {
      if (this.form.invalid) return;
      const payload = {
        answers: this.answersArray.value,
      };
      console.log('payload: ', payload);
      this.quizQuestionService.submitFirstTimeQuiz('user123', payload);
      console.log('first time quiz submitted');
      // TODO: navigate to a specific route
    }
  }
}
