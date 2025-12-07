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
  private readonly preferenceColors: Record<string, string> = {
    DISLIKED: 'B3542E',
    FINE: 'F2C14E',
    LIKED: '3C8C69',
  };

  private readonly defaultPreferenceColor = '3C8C69';

  @Input() preferences?: ReviewPreference[] = [];
  @Input() preferenceSelected?: string;
  @Output() preferenceSelectedChange = new EventEmitter<string>();

  circleColor(preference: ReviewPreference): string {
    const color =
      this.preferenceColors[preference.bucket] ?? this.defaultPreferenceColor;
    return `#${color}`;
  }

  onPreferenceChange(value: string) {
    this.preferenceSelectedChange.emit(value);
    this.preferenceSelected = value;
    console.log('emitting new value ', value);
  }
}
