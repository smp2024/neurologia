import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardClientPage } from './card-client.page';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: CardClientPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes),
    ComponentsModule,],
  exports: [RouterModule],
})
export class CardClientPageRoutingModule {}
