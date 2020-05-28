import { Injectable } from '@angular/core';
import { Hero } from "../interfaces/hero";
import { HEROES } from "../interfaces/mock-heroes";
import { Observable, of } from 'rxjs';
import { MessageService } from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: Heroes obtenidos');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: Se obtuvo el héroe con id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}
