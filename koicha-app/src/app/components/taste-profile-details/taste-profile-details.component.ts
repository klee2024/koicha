import { Component, Input } from '@angular/core';
import { TasteChartComponent } from '../taste-chart/taste-chart.component';
import { TasteProfile } from '../../models/taste-profile';

@Component({
  selector: 'app-taste-profile-details',
  imports: [TasteChartComponent],
  standalone: true,
  templateUrl: './taste-profile-details.component.html',
  styleUrl: './taste-profile-details.component.css',
})
export class TasteProfileDetailsComponent {
  @Input() tasteProfile?: TasteProfile = undefined;
  constructor() {}
}
