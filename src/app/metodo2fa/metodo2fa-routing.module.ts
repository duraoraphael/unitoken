import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Metodo2faPage } from './metodo2fa.page';

const routes: Routes = [
  {
    path: '',
    component: Metodo2faPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Metodo2faPageRoutingModule {}
