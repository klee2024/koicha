import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewPreference } from '../../../models/review-preference';

@Component({
  selector: 'app-review-preference-selector',
  imports: [CommonModule, FormsModule],
  templateUrl: './review-preference-selector.component.html',
  styleUrl: './review-preference-selector.component.css',
})
export class ReviewPreferenceSelectorComponent {
  @Input() preferences?: ReviewPreference[] = [];
  // public reviewPreferenceNameEnum = ReviewPreferenceName;
  @Output() preferenceSelected = new EventEmitter<string>();
  @Output() selectedPreferenceBucketChange = new EventEmitter<string>();

  onChange(value: string) {
    this.selectedPreferenceBucketChange.emit(value);
    console.log('emitting new value');
  }
}
