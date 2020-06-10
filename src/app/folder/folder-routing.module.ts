import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import { OtroComponent } from "./otro/otro.component";
import { HeroesPage  } from "./heroes/heroes.page";

const routes: Routes = [

  {
    path: 'resource',
    component: HeroesPage,
    children: [
      {
        path: 'heroes',
        loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesPageModule)
      },
      {
        path: 'hero-detail',
        loadChildren: () => import('./hero-detail/hero-detail.module').then(m => m.HeroDetailPageModule)
      },      
      {
        path: '',
        redirectTo: '/resource/heroes',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
