import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Hero } from '../hero';

/*Para validar forms*/
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

 @Output() hero = new EventEmitter<Hero>(); // Con el @Output el padre coge la informacion del hijo a traves de los inputs del formulario

  constructor() { }

  formularioHeroe = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    age: new FormControl('', [Validators.required, Validators.maxLength(3)]),
    skill: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    city:new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    image:new FormControl('', Validators.required)
   }); 

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.formularioHeroe.valid)
      return;

    // si el formulario es valido enviar hero por output.
    // El padre tiene que anadirlo a la lista

  }
}
