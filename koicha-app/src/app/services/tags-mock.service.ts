import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Tag } from '../models/tag';
import { MOCK_TAGS } from '../data/tags.mock';

@Injectable({
  providedIn: 'root',
})
export class TagsMockService {
  constructor() {}
  getTags(): Observable<Tag[]> {
    // simulate network delay
    return of(MOCK_TAGS).pipe(delay(300));
  }
}
