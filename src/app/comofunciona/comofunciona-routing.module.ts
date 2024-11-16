import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComofuncionaPage } from './comofunciona.page';

const routes: Routes = [
  {
    path: '',
    component: ComofuncionaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComofuncionaPageRoutingModule {}
