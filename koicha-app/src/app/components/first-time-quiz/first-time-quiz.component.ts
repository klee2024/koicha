import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { QUIZ_QUESTIONS } from './quiz-questions';

@Component({
  selector: 'app-first-time-quiz',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './first-time-quiz.component.html',
  styleUrl: './first-time-quiz.component.css',
  standalone: true,
})
export class FirstTimeQuizComponent implements OnInit {
  quizForm!: FormGroup;
  quizQuestions = QUIZ_QUESTIONS;

  ngOnInit() {
    const formControls: { [key: string]: FormControl } = {};
    this.quizQuestions.forEach((q) => {
      formControls[q.id] = new FormControl('', Validators.required);
    });
    this.quizForm = new FormGroup(formControls);
  }

  onSubmit() {
    console.log(this.quizForm.value);
  }
}
