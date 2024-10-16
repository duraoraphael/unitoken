import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EsqueceusenhaPageRoutingModule } from './esqueceusenha-routing.module';

import { EsqueceusenhaPage } from './esqueceusenha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EsqueceusenhaPageRoutingModule
  ],
  declarations: [EsqueceusenhaPage]
})
export class EsqueceusenhaPageModule {}
