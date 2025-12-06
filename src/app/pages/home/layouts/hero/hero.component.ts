import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonService } from '../../../../common/services/common.service';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ScrollRevealDirective } from '../../../../common/directives/scroll-reveal.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    MatCardModule,
    MatGridListModule,
    CommonModule,
    MatButtonModule,
    ScrollRevealDirective,
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit {
  hero$ = this.commonService.getHero();
  constructor(
    private commonService: CommonService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    const section = this.el.nativeElement;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(section, 'visible');
          observer.disconnect();
        }
      },
      {
        threshold: 0.15, // hero appears earlier than other sections
      }
    );

    observer.observe(section);
  }
}
