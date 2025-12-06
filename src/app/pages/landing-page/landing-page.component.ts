import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  RouterOutlet,
  RouterModule,
  ActivatedRoute,
  Router,
} from '@angular/router';
import { NAV_ITEMS } from '../../models/NavItems';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  title = 'calitour';
  isMobile = false;
  isOpen = true;
  items$ = NAV_ITEMS;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
        if (!this.isMobile) {
          this.isOpen = false; // auto-close drawer on desktop
        }
      });
  }
  toggleDrawer() {
    if (this.isMobile) {
      this.isOpen = !this.isOpen;
    }
  }
}
