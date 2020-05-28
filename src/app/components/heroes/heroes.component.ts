import { Component, OnInit } from '@angular/core';
import { HeroService } from "../../services/hero.service";
import { MessageService } from "../../services/message.service";
import { Hero } from "../../interfaces/hero";



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe((heroes) => { this.heroes = heroes });
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  
}
