import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchEventPageRoutingModule } from './search-event-routing.module';

import { SearchEventPage } from './search-event.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchEventPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SearchEventPage]
})
export class SearchEventPageModule {}
