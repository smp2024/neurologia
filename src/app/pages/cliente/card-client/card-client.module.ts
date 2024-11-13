import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CardClientPageRoutingModule } from './card-client-routing.module';
import { CardClientPage } from './card-client.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardClientPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CardClientPage]
})
export class CardClientPageModule {}
