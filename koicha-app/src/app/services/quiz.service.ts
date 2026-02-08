import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Quiz, QuizAnswer } from '../models/Quiz';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private readonly baseUrl = 'http://127.0.0.1:8000/api/quiz'; // e.g. 'http://localhost:8000/api/quiz'

  constructor(private http: HttpClient) {}

  getQuiz(quizSlug: string) {
    return this.http.get<Quiz>(`${this.baseUrl}/${quizSlug}/latest/`);
  }

  submitQuiz(quizSlug: string, quizResults: { answers: QuizAnswer[] }) {
    return this.http.post(
      `${this.baseUrl}/${quizSlug}/latest/submit/`,
      quizResults
    );
  }
}
