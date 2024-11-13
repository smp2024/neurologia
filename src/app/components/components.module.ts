import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ClientsComponent } from './clients/clients.component';
import { HeaderComponent } from './header/header.component';
import { EventsComponent } from './events/events.component';
import { AddClientComponent } from './add-client/add-client.component';
import { FormsModule } from '@angular/forms';
import { AddClientListComponent } from './add-client-list/add-client-list.component';
import { AddEventClientComponent } from './add-event-client/add-event-client.component';
import { EditEventClientComponent } from './edit-event-client/edit-event-client.component';
import { AddEventComponent } from './add-event/add-event.component';


@NgModule({
  declarations: [
    HeaderComponent,
    NavigationBarComponent,
    ClientsComponent,
    EventsComponent,
    AddClientComponent,
    AddClientListComponent,
    AddEventClientComponent,
    EditEventClientComponent,
    AddEventComponent
  ],
  exports: [
    HeaderComponent,
    NavigationBarComponent,
    ClientsComponent,
    EventsComponent,
    AddClientComponent,
    AddClientListComponent,
    AddEventClientComponent,
    EditEventClientComponent,
    AddEventComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentsModule { }
