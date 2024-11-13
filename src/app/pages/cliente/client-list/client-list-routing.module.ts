import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientListPage } from './client-list.page';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: ClientListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    ComponentsModule,],
  exports: [RouterModule],
})
export class ClientListPageRoutingModule {}
