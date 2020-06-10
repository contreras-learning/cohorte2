import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroDetailPage } from './hero-detail.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { HeroDetailPageRoutingModule } from './hero-detail-routing.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: HeroDetailPage }]),
    HeroDetailPageRoutingModule,
  ],
  declarations: [HeroDetailPage]
})
export class HeroDetailPageModule {}
