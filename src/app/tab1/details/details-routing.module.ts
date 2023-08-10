import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsPage } from './details.page';
import {FavorietenPage} from "../favorieten/favorieten.page";

import {AddplantPage} from "../addplant/addplant.page";
const routes: Routes = [
  {
    path: '',
    component: DetailsPage
  },
  {
    path: 'favorieten',
    component: FavorietenPage,
    loadChildren: () => import('../favorieten/favorieten.module').then( m => m.FavorietenPageModule)
  },{
    path: 'favorieten/:id',
    component: FavorietenPage,
    loadChildren: () => import('../favorieten/favorieten.module').then( m => m.FavorietenPageModule)
  },
  {
    path: 'addplant',
    component: AddplantPage,
    loadChildren: () => import('../addplant/addplant.module').then( m => m.AddplantPageModule)
  },
  {
    path: 'addplant/:id',
    component: AddplantPage,
    loadChildren: () => import('../addplant/addplant.module').then( m => m.AddplantPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsPageRoutingModule {}
