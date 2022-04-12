import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
 
  createDb() {
    const heroes = [
      { id: 11, name: 'Dr Nice', age:30, skill:"being kind", city:"Albacete", image:"/assets/nice.jfif" },
      { id: 12, name: 'Narco', age:45, skill:"trapichea", city:"Medellin", image:"/assets/pablo.jfif" },
      { id: 13, name: 'Bombasto', age:17, skill:"tirar petardos", city:"Valencia", image:"/assets/bombasto.jfif" },
      { id: 14, name: 'Pedro Sanchez', age:50, skill:"arruinarte", city:"Madriz", image:"/assets/pedro.jfif" },
      { id: 15, name: 'Magneta', age:25, skill:"attract iron", city:"Murcia", image:"/assets/magneta.jfif" },
      { id: 16, name: 'RubberMan', age:33, skill:"bounce", city:"Benalmadena", image:"/assets/rubberman.jfif" },
      { id: 17, name: 'Emily', age:65, skill:"get drunked", city:"Benidorm", image:"/assets/guiri.jfif" },
      { id: 18, name: 'Dr IQ', age:22, skill:"intelligence", city:"Huelva", image:"/assets/jimmyneutron.jfif" },
      { id: 19, name: 'Magma', age:30, skill:"fire", city:"Badajoz", image:"/assets/magma.jfif" },
      { id: 20, name: 'Tornado', age:44, skill:"wind", city:"Finisterre", image:"/assets/tornado.jfif" }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty, the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}