import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Hero } from '../hero';

/*Para validar forms*/
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PracticaHeroService } from '../practica-hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

  @Output() lastHero = new EventEmitter<Hero>(); // Con el @Output el padre coge la informacion del hijo a traves de los inputs del formulario

  hero: Hero | undefined;

  repeatedHero = false;

  constructor(private practicaheroService: PracticaHeroService) { }

  formularioHeroe = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    age: new FormControl('', [Validators.required, Validators.maxLength(3)]),
    skill: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    city:new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
   }); 

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.formularioHeroe.valid)return;

    // si el formulario es valido enviar hero por output.
    // El padre tiene que anadirlo a la lista
    

      let request = {
        ...this.formularioHeroe.getRawValue()  
      }
      this.practicaheroService.searchHeroes(request.name).subscribe(heroes => {
        if (heroes.length == 0){
        this.repeatedHero = false;
          this.practicaheroService.addHero(request)
          .subscribe(newHero => {
            this.formularioHeroe.markAsPristine();
            this.formularioHeroe.reset();
            this.lastHero.emit(newHero);
          });
        }else{
        this.repeatedHero = true;
        }
      });

      
      
  }
}
