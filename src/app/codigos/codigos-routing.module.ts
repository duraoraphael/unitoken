import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodigosPage } from './codigos.page';

const routes: Routes = [
  {
    path: '',
    component: CodigosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodigosPageRoutingModule {}
