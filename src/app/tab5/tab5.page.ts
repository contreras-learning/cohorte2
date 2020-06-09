import { Component, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Hero } from '../model/hero';
import { Location } from '@angular/common';
import { HeroService } from "../services/hero.service";



@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {

  @Input() hero: Hero;
  constructor(private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location) {}


    ngOnInit(): void {
      this.getHero();
    }
  
    getHero(): void {
      const id = this.route.snapshot.paramMap.get('id');
      this.heroService.getHero(id)
        .subscribe(hero => this.hero = hero);
    }
  
    goBack(): void {
      this.location.back();
    }
  
    save(): void {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  

}
