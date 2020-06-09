import { Component } from '@angular/core';
import { HeroService } from "../services/hero.service";
import { MessageService } from "../services/message.service";
import { Hero } from "../model/hero";


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  heroes: Hero[];

  constructor(private heroService: HeroService, private messageService: MessageService) {}

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe((heroes) => { this.heroes = heroes });
  }

  ngOnInit(): void {
    this.getHeroes();    
  }

  add(name: string, power: string, color: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name, power, color } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  

}
