import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasteProfileDetailsComponent } from './taste-profile-details.component';

describe('TasteProfileDetailsComponent', () => {
  let component: TasteProfileDetailsComponent;
  let fixture: ComponentFixture<TasteProfileDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasteProfileDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasteProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
