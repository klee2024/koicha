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
  @Input() preferenceSelected?: string;
  @Output() preferenceSelectedChange = new EventEmitter<string>();
  readonly preferenceColorMap: Record<string, string> = {
    DISLIKED: 'bg-[#B3542E]',
    FINE: 'bg-[#F2C14E]',
    LIKED: 'bg-[#3C8C69]',
  };

  circleColorClass(bucket: string): string {
    return this.preferenceColorMap[bucket] ?? 'bg-neutral-400';
  }

  // TODO: update this so that any time a chagne is made even with the slider, the preference reflects the new choice
  onPreferenceChange(value: string) {
    this.preferenceSelectedChange.emit(value);
    this.preferenceSelected = value;
    console.log('emitting new value ', value);
  }
}
