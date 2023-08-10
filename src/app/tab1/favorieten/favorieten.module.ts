import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavorietenPageRoutingModule } from './favorieten-routing.module';

import { FavorietenPage } from './favorieten.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavorietenPageRoutingModule
  ],
  declarations: [FavorietenPage]
})
export class FavorietenPageModule {}
