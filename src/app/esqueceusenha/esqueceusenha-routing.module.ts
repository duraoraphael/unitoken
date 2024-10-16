import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EsqueceusenhaPage } from './esqueceusenha.page';

const routes: Routes = [
  {
    path: '',
    component: EsqueceusenhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EsqueceusenhaPageRoutingModule {}
