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
  @Output() subPreferenceSelected = new EventEmitter<string>();
  @Output() ratingValueSelected = new EventEmitter<number>();

  @Output() ratingValueChange = new EventEmitter<number>();

  value?: number;

  constructor() {}

  ngOnInit() {
    if (
      this.initialRecommendationValue &&
      this.max &&
      this.initialRecommendationValue > this.max
    ) {
      this.value = this.max;
    }
    if (
      this.initialRecommendationValue &&
      this.min &&
      this.initialRecommendationValue < this.min
    ) {
      this.value = this.min;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['initialRecommendationValue'] ||
      changes['min'] ||
      changes['max']
    ) {
      this.value = this.initialRecommendationValue ?? this.min;
    }
  }

  onValueChange(newValue: string) {
    const numericValue = Number(newValue);
    this.value = numericValue;
    this.ratingValueChange.emit(numericValue);
  }
}
