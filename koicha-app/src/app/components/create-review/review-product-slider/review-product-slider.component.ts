import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ReviewSubPreference } from '../../../models/review-preference';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-review-product-slider',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-product-slider.component.html',
  styleUrl: './review-product-slider.component.css',
})
export class ReviewProductSliderComponent {
  readonly STEP = 1;
  @Input() min?: number;
  @Input() max?: number;
  @Input() subPreferences?: ReviewSubPreference[];
  @Input() initialRecommendationValue?: number;
  @Output() ratingValueSelected = new EventEmitter<number>();

  @Output() ratingValueChange = new EventEmitter<number>();
  @Output() recommendationValueChange = new EventEmitter<number>();

  value?: number;

  constructor() {}

  private clampToRange(value: number, min: number, max: number): number {
    console.log('clamping to range');
    if (value > max) return max;
    if (value < min) return min;
    return value;
  }

  ngOnChanges(): void {
    // Ensure we have numbers to work with
    const initial = this.initialRecommendationValue ?? this.min;

    if (initial && this.min != undefined && this.max != undefined) {
      this.value = this.clampToRange(initial, this.min, this.max);
    }
  }

  onValueChange(newValue: string) {
    const numericValue = Number(newValue);
    this.value = numericValue;
    this.ratingValueChange.emit(numericValue);
  }
}
