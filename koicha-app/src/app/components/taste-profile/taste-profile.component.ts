import { Component } from '@angular/core';
import { TasteChartComponent } from '../taste-chart/taste-chart.component';

@Component({
  selector: 'app-taste-profile',
  imports: [TasteChartComponent],
  standalone: true,
  templateUrl: './taste-profile.component.html',
  styleUrl: './taste-profile.component.css',
})
export class TasteProfileComponent {
  constructor() {}
}
