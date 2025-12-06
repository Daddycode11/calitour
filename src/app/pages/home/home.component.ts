import { Component } from '@angular/core';
import { HeroComponent } from './layouts/hero/hero.component';
import { DestinationsComponent } from './layouts/destinations/destinations.component';
import { StoryComponent } from './layouts/story/story.component';
import { FooterComponent } from './layouts/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    DestinationsComponent,
    StoryComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
