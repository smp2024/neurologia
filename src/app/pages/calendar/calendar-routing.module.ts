import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarPage } from './calendar.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: CalendarPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes),
    FormsModule,
    ComponentsModule],
  exports: [RouterModule],
})
export class CalendarPageRoutingModule {}
