import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OQueEPage } from './o-que-e.page';

const routes: Routes = [
  {
    path: '',
    component: OQueEPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OQueEPageRoutingModule {}
