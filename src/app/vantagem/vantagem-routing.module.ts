import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VantagemPage } from './vantagem.page';

const routes: Routes = [
  {
    path: '',
    component: VantagemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VantagemPageRoutingModule {}
