import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VantagemPageRoutingModule } from './vantagem-routing.module';

import { VantagemPage } from './vantagem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VantagemPageRoutingModule
  ],
  declarations: [VantagemPage]
})
export class VantagemPageModule {}
