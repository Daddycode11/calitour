import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonService } from '../../../../common/services/common.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ScrollRevealDirective } from '../../../../common/directives/scroll-reveal.directive';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ScrollRevealDirective],
  templateUrl: './story.component.html',
  styleUrl: './story.component.scss',
})
export class StoryComponent implements AfterViewInit {
  story$ = this.commonService.getStory();
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
      { threshold: 0.2 }
    );

    observer.observe(section);
  }
}
