import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailPage } from './hero-detail.page';

const routes: Routes = [
  {
    path: '',
    component: HeroDetailPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroDetailPageRoutingModule {}
