import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReviewPreferenceName } from '../../../models/review-preference';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-preference-selector',
  imports: [CommonModule, FormsModule],
  templateUrl: './review-preference-selector.component.html',
  styleUrl: './review-preference-selector.component.css',
})
export class ReviewPreferenceSelectorComponent {
  public reviewPreferenceNameEnum = ReviewPreferenceName;
  @Input() preferenceInputEnumValue?: number;
  @Output() preferenceInputEnumValueChange = new EventEmitter<number>();

  onChange(value: number) {
    this.preferenceInputEnumValueChange.emit(value);
    console.log('emitting new value');
  }
}
