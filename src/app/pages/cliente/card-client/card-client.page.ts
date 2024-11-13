import { inmuebles } from './../../../interfaces/index';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit,  ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UsuarioService } from 'src/app/services/usuario.service';
import { InfoAdviser, clientList, clientView } from '../../../interfaces';
import { IonModal } from '@ionic/angular';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-card-client',
  templateUrl: './card-client.page.html',
  styleUrls: ['./card-client.page.scss'],
})
export class CardClientPage implements OnInit {
  card = {
    name: ''
  };
  adviser: InfoAdviser = {};
  clientInfo: clientView = {};
  public clientSeguimiento: any;
  seguimientos: any;
  desarrollos: any;
inmuebles: any;
  constructor(
    private naveCtrl: NavController,
    private storage: Storage,
    private usuarioService: UsuarioService
) { this.init(); }

  ngOnInit() {
  }
  async init() {
    const storage = await this.storage.create();
    const client_id = await this.storage.get('cliente_id');
    const id = await this.storage.get('user_id');

    this.usuarioService.getClientView(client_id).subscribe(resp => {

      this.clientInfo = resp[0];
      this.seguimientos = resp[0].seguimiento_rapido;
      this.desarrollos = resp[0].desarrollos;
      this.inmuebles = resp[0].inmuebles;


    });

  }


  @ViewChild(IonModal) modal: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }
}
