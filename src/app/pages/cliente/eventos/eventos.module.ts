/* eslint-disable @typescript-eslint/quotes */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventosPageRoutingModule } from './eventos-routing.module';

import { EventosPage } from './eventos.page';
import { ComponentsModule } from "../../../components/components.module";

@NgModule({
    declarations: [EventosPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EventosPageRoutingModule,
        ComponentsModule
    ]
})
export class EventosPageModule {}
