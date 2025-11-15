import { Component, EventEmitter, Output } from '@angular/core';
import { TasteProfileService } from '../../services/taste-profile.service';
import { TasteProfile } from '../../models/taste-profile';
import { TasteProfileDetailsComponent } from '../taste-profile-details/taste-profile-details.component';
import { TasteChartComponent } from '../taste-chart/taste-chart.component';

@Component({
  selector: 'app-taste-profile',
  standalone: true,
  imports: [TasteProfileDetailsComponent, TasteChartComponent],
  templateUrl: './taste-profile.component.html',
  styleUrl: './taste-profile.component.css',
})
export class TasteProfileComponent {
  tasteProfile?: TasteProfile = undefined;

  constructor(private tasteProfileService: TasteProfileService) {}

  ngOnInit() {
    // TODO: implement auth service call
    const userId = 'user123';
    if (!userId) {
      console.warn('No authenticated user found.');
      return;
    }

    // this.tasteProfileService
    //   .getTasteProfileByUserId(userId)
    //   .subscribe((data) => {
    //     this.tasteProfile = data;
    //     console.log('taste profile retrieved');
    //   });

    this.tasteProfileService
      .getEmptyTasteProfileDetails(userId)
      .subscribe((data) => {
        this.tasteProfile = data;
        console.log('taste profile retrieved');
      });
  }
}
