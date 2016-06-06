import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  directives: [HeroDetailComponent],
  templateUrl: 'app/heroes.component.html',
  styleUrls:  ['app/heroes.component.css']
  })

export class HeroesComponent implements OnInit {
  title = 'Tour of Heroes';
  heroes: Hero[];
  error: any;
  selectedHero: Hero;
  addingHero = false;

  constructor(
    private router: Router,
    private heroService: HeroService) {
  }

  getHeroes() {
      this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    };

  ngOnInit() {
      this.getHeroes();
    };

  onSelect(hero: Hero) { this.selectedHero = hero; };

  gotoDetail() {
    this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
  }

  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero) {
    this.addingHero = false;
    if (savedHero) { this.getHeroes(); }
  }

  delete(hero: Hero, event: any) {
    event.stopPropagation();
    this.heroService
        .delete(hero)
        .then(res => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedHero === hero) { this.selectedHero = null; }
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

}
