import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import {Tab1PageModule} from "./tab1.module";
import {DetailsPage} from "./details/details.page";
import {FavorietenPageModule} from "./favorieten/favorieten.module";
import {FavorietenPage} from "./favorieten/favorieten.page";
import {AddplantPageModule} from "./addplant/addplant.module";
import {AddplantPage} from "./addplant/addplant.page";
import {AuthGuard, redirectUnauthorizedTo} from "@angular/fire/auth-guard";


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);
const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  /*{
    path: 'Tab2Page',
    loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
  },*/
  {
    path: 'details',
    component: DetailsPage,
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  },{
    path: 'details/:id',
    component: DetailsPage,
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'favorieten',
    component: FavorietenPage,
    loadChildren: () => import('./favorieten/favorieten.module').then( m => m.FavorietenPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },{
    path: 'favorieten/:id',
    component: FavorietenPage,
    loadChildren: () => import('./favorieten/favorieten.module').then( m => m.FavorietenPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'addplant',
    component: AddplantPage,
    loadChildren: () => import('./addplant/addplant.module').then( m => m.AddplantPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'addplant/:id',
    component: AddplantPage,
    loadChildren: () => import('./addplant/addplant.module').then( m => m.AddplantPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
