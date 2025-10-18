import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardContentComponent } from './product-card-content.component';

describe('ProductCardContentComponent', () => {
  let component: ProductCardContentComponent;
  let fixture: ComponentFixture<ProductCardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
