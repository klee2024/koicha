import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkShelfComponent } from './bookmark-shelf.component';

describe('BookmarkShelfComponent', () => {
  let component: BookmarkShelfComponent;
  let fixture: ComponentFixture<BookmarkShelfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkShelfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
