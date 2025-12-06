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
  Router,
  ActivatedRoute,
} from '@angular/router';
import { NAV_ITEMS } from '../../models/NavItems';

@Component({
  selector: 'app-main',
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
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
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
        console.log(result);
        this.isMobile = result.matches;
        if (this.isMobile) {
          this.isOpen = false;
        }
      });
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  get mode(): 'over' | 'side' {
    return this.isMobile ? 'over' : 'side';
  }
  get activeRoute(): string {
    let route = this.activatedRoute.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot.data['breadcrumb'] || '';
  }
}
