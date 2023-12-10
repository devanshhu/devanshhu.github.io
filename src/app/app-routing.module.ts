import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { TechnologiesComponent } from './technologies/technologies.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DisplacementSphereComponent } from './about/displacement-sphere/displacement-sphere.component';
const routes: Routes = [
  {
    path: '',
    component: AboutComponent
  },
  // {
  //   path : 'projects',
  //   component : TechnologiesComponent
  // },
  {
    path: 'chandrayan',
    component: DisplacementSphereComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
