import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

/*Para validar forms*/
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Hero } from '../hero';
import { PracticaHeroService } from '../practica-hero.service';



@Component({
  selector: 'app-hero-detalle',
  templateUrl: './hero-detalle.component.html',
  styleUrls: ['./hero-detalle.component.css']
})
export class HeroDetalleComponent implements OnInit {

  hero: Hero | undefined;

  defaultImage: string = "./assets/default-imagen";

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    age: new FormControl('', Validators.required),
    skill: new FormControl(''),
    city:new FormControl(''),
    image:new FormControl(Validators.required)
   });

  constructor(
    private route: ActivatedRoute,
    private practicaheroService: PracticaHeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  initializeForm(hero: Hero){
    this.userForm.controls['name'].setValue(hero?.name); //Necesitamos realizar esta funcion para poder cargar los datos del formulario porque sino nos devuelve un error de que se esta usando antes de inicializarse
    this.userForm.controls['age'].setValue(hero?.age); 
    this.userForm.controls['skill'].setValue(hero?.skill); 
    this.userForm.controls['city'].setValue(hero?.city); 
  }

  getHero(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.practicaheroService.getHero(id)
      .subscribe(hero => { //Nos suscribimos porque queremos recibir la informacion de manera asincrona del Observable de tipo Hero
        this.hero = hero;
        this.initializeForm(hero);
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.practicaheroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

  onFormSubmit():void {

    console.log('Name:' + this.userForm.controls['name'].value);
    console.log('Age:' + this.userForm.controls['age'].value);
    console.log('City:' + this.userForm.controls['city'].value);
    console.log('Country:' + this.userForm.controls['country'].value);
    console.log('Married:' + this.userForm.controls['married'].value);

  }

}
