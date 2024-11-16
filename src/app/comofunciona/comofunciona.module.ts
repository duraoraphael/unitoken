import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComofuncionaPageRoutingModule } from './comofunciona-routing.module';

import { ComofuncionaPage } from './comofunciona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComofuncionaPageRoutingModule
  ],
  declarations: [ComofuncionaPage]
})
export class ComofuncionaPageModule {}
