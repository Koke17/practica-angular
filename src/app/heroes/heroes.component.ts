import { Component, OnInit, VERSION } from '@angular/core';

import { Hero } from "../hero";

import { PracticaHeroService } from "../practica-hero.service";

import { MessageService } from '../message.service';
import { identifierName } from '@angular/compiler';




@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  //key: string = "Hero";

  //myItem: string | null = null ;

  lastHero : Hero | undefined ;
  
  selectedHero?: Hero;

  heroes: Hero[]= [];
  
  constructor(private practicaheroService: PracticaHeroService, private messageService: MessageService) { }



  ngOnInit(): void {
    this.getHeroes();
    this.lastHero=this.practicaheroService.retrieveHero();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes():void {
    this.practicaheroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.practicaheroService.deleteHero(hero.id).subscribe();
    this.practicaheroService.removeHero();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.practicaheroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
        this.practicaheroService.storeHero(hero);
        this.lastHero = this.practicaheroService.retrieveHero();
      });
  }

}
