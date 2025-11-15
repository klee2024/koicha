import { Component } from '@angular/core';
import { TasteChartComponent } from '../taste-chart/taste-chart.component';

@Component({
  selector: 'app-taste-profile-details',
  imports: [TasteChartComponent],
  standalone: true,
  templateUrl: './taste-profile-details.component.html',
  styleUrl: './taste-profile-details.component.css',
})
export class TasteProfileDetailsComponent {
  constructor() {}
}
