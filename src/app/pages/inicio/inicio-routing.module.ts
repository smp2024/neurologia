import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import  {FormsModule, ReactiveFormsModule}  from '@angular/forms';
import { InicioPage } from './inicio.page';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: InicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
            FormsModule,
            ComponentsModule,
            ReactiveFormsModule],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
