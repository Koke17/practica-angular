import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { HeroDetalleComponent } from './hero-detalle/hero-detalle.component';
import { HeroesComponent } from './heroes/heroes.component';



const routes: Routes = [
  {path: '', redirectTo: '/heroes', pathMatch: 'full'},
  {path:'heroes', component: HeroesComponent},
  {path: 'detalle/:id', component: HeroDetalleComponent }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
