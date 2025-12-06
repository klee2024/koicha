import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Quiz } from '../models/Quiz';

@Injectable({
  providedIn: 'root',
})
export class FirstTimeQuizService {
  private readonly baseUrl = 'http://127.0.0.1:8000/api'; // e.g. 'http://localhost:8000/api/quiz'

  constructor(private http: HttpClient) {}

  getQuiz(quiz_slug: string) {
    return this.http.get<Quiz>(`${this.baseUrl}/quiz/${quiz_slug}/latest/`);
  }

  submitFirstTimeQuiz(
    userId: string,
    quizResults: { answers: (string | null)[] }
  ) {
    return of({ success: true }).pipe(delay(100));
  }
}
