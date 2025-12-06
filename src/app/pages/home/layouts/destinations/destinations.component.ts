import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonService } from '../../../../common/services/common.service';
import { MatCardModule } from '@angular/material/card';
import { swissDestinations } from '../../../../models/common/Destinations';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ScrollRevealDirective } from '../../../../common/directives/scroll-reveal.directive';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatButtonModule,
    ScrollRevealDirective,
  ],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.scss',
})
export class DestinationsComponent implements AfterViewInit {
  destinations$ = swissDestinations;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const section = this.el.nativeElement;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(section, 'visible');
          observer.disconnect();
        }
      },
      { threshold: 0.4 } // 20% of section must be visible
    );

    observer.observe(section);
  }
}
