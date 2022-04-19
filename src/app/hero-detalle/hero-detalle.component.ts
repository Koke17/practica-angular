import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location, NgClass } from '@angular/common';

/*Para validar forms*/
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Hero } from '../hero';
import { PracticaHeroService } from '../practica-hero.service';
import { HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-hero-detalle',
  templateUrl: './hero-detalle.component.html',
  styleUrls: ['./hero-detalle.component.css']
})
export class HeroDetalleComponent implements OnInit {

  hero: Hero | undefined;

  defaultImage: string = "./assets/default-imagen.png";

  fileData: File | null = null;

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    age: new FormControl('', [Validators.required, Validators.maxLength(3)]),
    skill: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    city:new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    image:new FormControl('', Validators.required)
   });

  constructor(
    private route: ActivatedRoute,
    private practicaheroService: PracticaHeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  //Necesitamos realizar esta funcion para poder cargar los datos del formulario porque sino nos devuelve un error de que se esta usando antes de inicializarse
  initializeForm(hero: Hero){
    this.userForm.controls['name'].setValue(hero?.name); 
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

  onFormSubmit():void {
    // Si el elemento imagen no tiene valor no seguir adelante
    if (this.hero?.image != "") {

      if (this.hero) {
        let request = {
          id: this.hero.id,
  
          ...this.userForm.getRawValue()
        };
  
        this.practicaheroService.updateHero(request) //le tengo que pasar al updated hero el valor actualizado del formulario, es por eso que le paso el objeto request
          .subscribe(() => this.goBack());
      }

      
      this.practicaheroService.postFile(this.fileData);

    }
    
  }
  onFileUpload(event:any){
    this.fileData = event.target.files[0];
  }


  // uploadFileToActivity() {
  //   this.practicaheroService.postFile(this.fileToUpload).subscribe(data => {
  //     // do something, if upload success
  //     }, error => {
  //       console.log(error);
  //     }); 
  // }

  onImageChange(event:any)
  {
    //manipular la imagen
    if (event?.target.files.length > 0) {
      console.log(event?.target.files[0]);
      console.log(event?.target.files[0].name);
      let imagenRecogida = this.practicaheroService.getFile(event.target.files[0])
      // imagenRecogida = this.hero?.id+".jfif";
      
    }
      
  }
}
