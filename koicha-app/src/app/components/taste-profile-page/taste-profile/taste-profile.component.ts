import { Component, EventEmitter, Output } from '@angular/core';
import { TasteProfileService } from '../../../services/taste-profile.service';
import { TasteProfile } from '../../../models/taste-profile';
import { TasteProfileDetailsComponent } from '../taste-profile-details/taste-profile-details.component';
import { TasteChartComponent } from '../taste-chart/taste-chart.component';
import { AuthService } from '../../../services/auth.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-taste-profile',
  standalone: true,
  imports: [TasteProfileDetailsComponent, TasteChartComponent],
  templateUrl: './taste-profile.component.html',
  styleUrl: './taste-profile.component.css',
})
export class TasteProfileComponent {
  tasteProfile?: TasteProfile = undefined;

  constructor(
    private tasteProfileService: TasteProfileService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // TODO: clean up by refactoring for async
    this.authService
      .isAuthenticated$()
      .pipe(
        switchMap((isAuthed) => {
          return isAuthed
            ? this.tasteProfileService.getUserTasteProfile()
            : this.tasteProfileService.getDefaultTasteProfile();
        })
      )
      .subscribe((profile) => {
        this.tasteProfile = profile;
      });
  }
}
