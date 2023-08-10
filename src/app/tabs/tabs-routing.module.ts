import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {DetailsPageRoutingModule} from "../tab1/details/details-routing.module";
import {DetailsPageModule} from "../tab1/details/details.module";
import {FavorietenPageModule} from "../tab1/favorieten/favorieten.module";

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'details',
        loadChildren: () => import('../tab1/details/details.module').then(m => m.DetailsPageModule)
      },
      {
        path: 'favorieten',
        loadChildren: () => import('../tab1/favorieten/favorieten.module').then(m => m.FavorietenPageModule)
      },
      {
        path: 'addplant',
        loadChildren: () => import('../tab1/addplant/addplant.module').then(m => m.AddplantPageModule)
      },

      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
