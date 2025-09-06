import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasteChartComponent } from './taste-chart.component';

describe('TasteChartComponent', () => {
  let component: TasteChartComponent;
  let fixture: ComponentFixture<TasteChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasteChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasteChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
