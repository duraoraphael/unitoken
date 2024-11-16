import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OQueEPageRoutingModule } from './o-que-e-routing.module';

import { OQueEPage } from './o-que-e.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OQueEPageRoutingModule
  ],
  declarations: [OQueEPage]
})
export class OQueEPageModule {}
