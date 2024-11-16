import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Metodo2faPageRoutingModule } from './metodo2fa-routing.module';

import { Metodo2faPage } from './metodo2fa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Metodo2faPageRoutingModule
  ],
  declarations: [Metodo2faPage]
})
export class Metodo2faPageModule {}
