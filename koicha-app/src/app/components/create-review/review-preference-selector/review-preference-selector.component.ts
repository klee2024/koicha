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

  // TODO: update this so that any time a chagne is made even with the slider, the preference reflects the new choice
  onChange(value: string) {
    this.preferenceSelectedChange.emit(value);
    console.log('emitting new value ', value);
  }
}
