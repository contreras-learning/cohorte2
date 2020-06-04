import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import { OtroComponent } from "./otro/otro.component";

const routes: Routes = [
  {
    path: 'prueba',
    component: FolderPage
  },
  {
    path: 'noprueba',
    component: OtroComponent
  },
  { path: '', redirectTo: '/prueba', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
