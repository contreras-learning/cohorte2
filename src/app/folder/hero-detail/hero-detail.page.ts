import { Component, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../interfaces/hero';
import { Location } from '@angular/common';
import { HeroService } from "../../services/hero.service";



@Component({
  selector: 'app-HeroDetail',
  templateUrl: 'hero-detail.page.html',
  styleUrls: ['hero-detail.page.scss']
})
export class HeroDetailPage {

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
