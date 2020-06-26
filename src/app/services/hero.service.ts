import { Injectable } from '@angular/core';
import { Hero } from "../interfaces/hero";

import { Observable, of } from 'rxjs';
import { MessageService } from "./message.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl: string = 'https://contreras-bictia2.herokuapp.com/heroes';

  constructor(private messageService: MessageService, private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: Heroes obtenidos');
    //return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  getHero(id: string): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: Se obtuvo el héroe con id=${id}`);
    return this.http.get<Hero>(this.heroesUrl + '/' + id);
  }

  updateHero(hero: Hero): Observable<Hero> {
    this.messageService.add(`HeroService: Se edito el héroe con id=${hero.id}`);
    return this.http.put<Hero>(this.heroesUrl + '/' + hero.id, hero);
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    this.messageService.add(`HeroService: Se creará el héroe con`);
    return this.http.post<Hero>(this.heroesUrl, hero);
  }
}
