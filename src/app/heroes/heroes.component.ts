import { Component, OnInit } from '@angular/core';

import { Hero } from "../hero";

import { PracticaHeroService } from "../practica-hero.service";

import { MessageService } from '../message.service';




@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  selectedHero?: Hero;

  heroes: Hero[]= [];
  
  constructor(private practicaheroService: PracticaHeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
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
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.practicaheroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

}
