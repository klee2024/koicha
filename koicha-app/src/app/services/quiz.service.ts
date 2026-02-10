import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Quiz, QuizAnswer } from '../models/Quiz';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private readonly baseUrl = environment.apiBaseUrl;
  private readonly appUrl = 'quiz';

  constructor(private http: HttpClient) {}

  getQuiz(quizSlug: string) {
    return this.http.get<Quiz>(
      `${this.baseUrl}/${this.appUrl}/${quizSlug}/latest/`
    );
  }

  submitQuiz(quizSlug: string, quizResults: { answers: QuizAnswer[] }) {
    return this.http.post(
      `${this.baseUrl}/${this.appUrl}/${quizSlug}/latest/submit/`,
      quizResults
    );
  }
}
