import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddplantPage } from './addplant.page';

const routes: Routes = [
  {
    path: '',
    component: AddplantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddplantPageRoutingModule {}
