import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaShelfPageComponent } from './tea-shelf-page.component';

describe('TeaShelfPageComponent', () => {
  let component: TeaShelfPageComponent;
  let fixture: ComponentFixture<TeaShelfPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeaShelfPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeaShelfPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
