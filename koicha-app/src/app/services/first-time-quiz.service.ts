import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Quiz } from '../models/Quiz';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FirstTimeQuizService {
  private readonly baseUrl = environment.apiBaseUrl; // e.g. 'http://localhost:8000/api/quiz'
  private readonly appUrl = 'quiz';
  constructor(private http: HttpClient) {}

  getQuiz(quiz_slug: string) {
    return this.http.get<Quiz>(
      `${this.baseUrl}/${this.appUrl}/${quiz_slug}/latest/`
    );
  }

  // TODO: integrate this with backend with auth
  submitFirstTimeQuiz(
    userId: string,
    quizResults: { answers: (string | null)[] }
  ) {
    return of({ success: true }).pipe(delay(100));
  }
}
