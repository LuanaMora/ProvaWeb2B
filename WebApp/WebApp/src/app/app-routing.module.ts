import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  /*{path: 'vacina', component: ContainerComponent},
  {path: 'vacina-edit/:id', component: ContainerComponent},
  {path: 'vacina-list', component: ContainerListComponent}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
