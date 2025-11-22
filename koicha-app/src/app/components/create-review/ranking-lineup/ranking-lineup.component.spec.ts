import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingLineupComponent } from './ranking-lineup.component';

describe('RankingLineupComponent', () => {
  let component: RankingLineupComponent;
  let fixture: ComponentFixture<RankingLineupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingLineupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingLineupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
