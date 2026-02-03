import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tea-shelf-page',
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './tea-shelf-page.component.html',
  styleUrl: './tea-shelf-page.component.css',
})
export class TeaShelfPageComponent {
  constructor(public authService: AuthService) {}
}
