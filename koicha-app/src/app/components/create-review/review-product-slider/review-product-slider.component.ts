import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReviewSubPreference } from '../../../models/review-preference';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-product-slider',
  imports: [CommonModule],
  templateUrl: './review-product-slider.component.html',
  styleUrl: './review-product-slider.component.css',
})
export class ReviewProductSliderComponent {
  @Input() subPreferences?: ReviewSubPreference[];
  @Output() subPreferenceSelected = new EventEmitter<string>();
  @Output() ratingValueSelected = new EventEmitter<number>();
}
