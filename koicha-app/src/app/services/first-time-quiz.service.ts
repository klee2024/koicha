import { Injectable } from '@angular/core';
import { MOCK_QUIZ_QUESTIONS } from '../data/form-questions.mock';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirstTimeQuizService {
  constructor() {}

  getQuizQuestions() {
    return of(MOCK_QUIZ_QUESTIONS).pipe(delay(300));
  }

  createFirstTimeQuizResults(userId: string, quizResults: string[]) {
    return of({ success: true }).pipe(delay(100));
  }
}
