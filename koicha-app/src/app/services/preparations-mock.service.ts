import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Preparation } from '../models/preparation';
import { MOCK_PREPARATIONS } from '../data/preparations.mock';

@Injectable({
  providedIn: 'root',
})
export class PreparationsMockService {
  constructor() {}

  getPreparations(): Observable<Preparation[]> {
    return of(MOCK_PREPARATIONS).pipe(delay(300));
  }
}
