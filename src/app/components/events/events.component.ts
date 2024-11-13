/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/dot-notation */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { events } from '../../interfaces';
import { IonModal } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {

  @Input() events: events[] = [];
  //public events: any;
  fCancelClient: FormGroup;
  eventCancel = {
    motivo: ''
  };

  constructor(
    private usuarioService: UsuarioService,
      private naveCtrl: NavController,
      public formBuilder: FormBuilder,
      private storage: Storage
    ) { }

    ngOnInit() {}
    // eslint-disable-next-line @typescript-eslint/member-ordering
    @ViewChild(IonModal) modal: IonModal;

    // eslint-disable-next-line @typescript-eslint/member-ordering
    name: string;

    confirm() {
      this.modal.dismiss(this.name, 'confirm');
    }

    cancel() {
      this.modal.dismiss(null, 'cancel');

    }

    cancel_() {
      this.modal.dismiss(null, 'cancel');

    }  showModalResp(){
      $('#respEvent').removeClass('d-none');
    }
    hideCancelEvent(){
      location.reload();
    }


    async cancelClient(fCancelClient: NgForm) {

      if (fCancelClient.invalid) {
        return;
      }
      const storage = await this.storage.create();
      const id = await this.storage.get('event_id');
      const valido = await this.usuarioService.postCancelEvent(id, this.eventCancel.motivo);
      //console.log(valido);

      this.hideCancelEvent();
      if (valido['Ok']) {
        this.naveCtrl.navigateRoot('/calendar', {animated: true});
        console.log(valido['mensaje']);
      } else if (!valido['Ok']){
        console.log(valido['mensaje']);
        this.naveCtrl.navigateRoot('/calendar', {animated: true});
      }
      //console.log(fCancelClient);
    }

    async saveEventId(id: string) {
      await this.storage.create();
      await this.storage.set('event_id', id);
      const store = new Storage();
    }
    onOffEvents(tag: string) {
      const id = "#"+tag;
      const className = ".tipoTarea-"+tag;

      // eslint-disable-next-line @typescript-eslint/quotes
      if($(id).prop("checked") === true){
        $(className).each(
          function() {
            $(this).removeClass('d-none');
          }
        );
      }
      else if($(id).prop("checked") === false){
        $(className).each(
          function() {
            $(this).addClass('d-none');
          }
        );
      }
    }
}
