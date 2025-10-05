import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-dropdown-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-popup.component.html',
  styleUrl: './dropdown-popup.component.css',
})
export class DropdownPopupComponent {
  dropdownPopupVisible: boolean = false;
  @Input() message!: string;
  @Input() messageType: 'info' | 'error' = 'info';

  displayPopupMessage() {
    this.dropdownPopupVisible = true;
    setTimeout(() => {
      this.dropdownPopupVisible = false;
    }, 5000);
  }
}
