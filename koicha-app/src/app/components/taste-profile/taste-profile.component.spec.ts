import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasteProfileComponent } from './taste-profile.component';

describe('TasteProfileComponent', () => {
  let component: TasteProfileComponent;
  let fixture: ComponentFixture<TasteProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasteProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasteProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
