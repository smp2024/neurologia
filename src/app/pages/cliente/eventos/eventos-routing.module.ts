import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventosPage } from './eventos.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: EventosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    ComponentsModule,
    FormsModule,],
  exports: [RouterModule],
})
export class EventosPageRoutingModule {}
