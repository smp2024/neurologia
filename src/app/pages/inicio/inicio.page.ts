/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { UsuarioService } from 'src/app/services/usuario.service';
import { InfoAdviser } from '../../interfaces/index';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})

export class InicioPage {

  clientAdd = {
    name: '',
    email: '',
    phoneOne: '',
    phoneTwo: '',
    phoneThree: '',
    type: '',
    development: '',
    contact: '',
  };

  cliente: string = null;
  user: string = null;
  userId: string = null;
  public events: any;
  public desarrollos: any;
  avatar: any;
  cuentaId: string;
  user_name: any;
  asesor_name: any;
  asesor_avatar: any;
  ionicForm: FormGroup;
  nombreMes: string;

  constructor(private http: HttpClient,
    private storage: Storage,
    private naveCtrl: NavController,
    private usuarioService: UsuarioService,
    public formBuilder: FormBuilder
  ) {
    this.us();
  }

  adviser: InfoAdviser = {};

  // eslint-disable-next-line @typescript-eslint/member-ordering
  advId = {
    id: '5',
    cuentaId: '12',
  };


  async us() {
    // const storage = await this.storage.create();
    // const id = await this.storage.get('user_id');
    // const foto = await this.storage.get('cuenta_logo');
    // const asesor_name = await this.storage.get('user_name');
    // this.asesor_name = asesor_name;

    // this.avatar = foto;
    // const meses = [
    //   'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    //   'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    // ];
    // const fechaActual = new Date();
    // const nombreMes = meses[fechaActual.getMonth()];
    // this.nombreMes = nombreMes;

    // this.usuarioService.getUserData(id).subscribe(resp => {
    //   this.adviser = resp[0];
    //   this.events = resp[0].events;

    // });
    // eslint-disable-next-line @typescript-eslint/naming-convention
    // this.us2();
  }
  async us2() {
    const storage = await this.storage.create();
    const cuenta = await this.storage.get('cuenta_id');
    this.usuarioService.getDevelopmentsList(cuenta).subscribe(resp => {
      this.desarrollos = resp;
      // console.log(this.desarrollos);
      this.saveDesarrollos(this.desarrollos);
    });
  }
  async saveDesarrollos(desarrollos: string) {

    await this.storage.create();
    await this.storage.set('desarrollos', desarrollos);
    const store = new Storage();

  };


  async addClients(fAddClient: NgForm) {

    if (fAddClient.invalid) {
      return;
    }

    /*  const valido = await this.usuarioService.addClient(
       this.clientAdd.name,
       this.clientAdd.email,
       this.clientAdd.phoneOne,
       this.clientAdd.phoneTwo,
       this.clientAdd.phoneThree,
       this.clientAdd.type,
       this.clientAdd.contact,
       this.clientAdd.development
     ); */

  }


  error() {
    $('#error').removeClass('d-none');
    $('.cont_input').addClass('input_error');

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

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }



}

