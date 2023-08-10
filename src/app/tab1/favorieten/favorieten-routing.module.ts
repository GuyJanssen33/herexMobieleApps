import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavorietenPage } from './favorieten.page';
import { DetailsPage} from '../details/details.page';
import {DetailsPageModule} from "../details/details.module";

const routes: Routes = [
  {
    path: '',
    component: FavorietenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavorietenPageRoutingModule {}
