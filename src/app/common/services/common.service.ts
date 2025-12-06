import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Hero, toHero } from '../../models/common/Hero';
import { CaliTourApi } from '../utils/Constants';
import { Story, toStory } from '../../models/common/OurStory';
import { Destination, toDestination } from '../../models/common/Destinations';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  apiKey = CaliTourApi.SECRET;

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.apiKey}`,
  });

  constructor(private client: HttpClient) {}

  getHero(): Observable<Hero> {
    const apiKey = CaliTourApi.SECRET;
    return this.client
      .get<any>(CaliTourApi.BASE_URL + CaliTourApi.HERO, {
        headers: this.headers,
      })
      .pipe(map(toHero));
  }
  getStory(): Observable<Story> {
    return this.client
      .get<any>(CaliTourApi.BASE_URL + CaliTourApi.STORY, {
        headers: this.headers,
      })
      .pipe(map(toStory));
  }
  getDestinations(): Observable<Destination[]> {
    return this.client
      .get<any>(CaliTourApi.BASE_URL + CaliTourApi.DESTINATIONS, {
        headers: this.headers,
      })
      .pipe(
        map((response) =>
          response.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            summary: item.summary,
            description: item.description,
            category: item.category,
            thumbnail: item.thumbnail.url,
            gallery: item.gallery.for,
          }))
        )
      );
  }
}
