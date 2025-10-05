import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPopupComponent } from './dropdown-popup.component';

describe('DropdownPopupComponent', () => {
  let component: DropdownPopupComponent;
  let fixture: ComponentFixture<DropdownPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
