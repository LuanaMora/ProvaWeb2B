import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VacinaComponent } from './vacina/vacina/vacina.component';
import { AnimalComponent } from './animal/animal/animal.component';

const routes: Routes = [
  {path: 'vacina', component: VacinaComponent},
  {path: 'animal', component: AnimalComponent},
  {path: 'vacina-edit/:id', component: VacinaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
