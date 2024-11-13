/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.page.html',
  styleUrls: ['./search-client.page.scss'],
})
export class SearchClientPage implements OnInit {
  clientSearch = {
    nombre: '',
    status: '',
    etapa: '',
    desarrollo: '',
    contacto: '',
    cuenta: '',
    user: '',

  };
  public desarrollos: any;
  ionicForm: FormGroup;
  cuentaUser: any;
  user: any;
  inmuebleDisabled = true;
  desarrolloValue: string;
  inmuebleValue: string;
  constructor(private http: HttpClient,
    private storage: Storage,
    private naveCtrl: NavController,
    private usuarioService: UsuarioService,
    public formBuilder: FormBuilder) {this.us2(); }

  ngOnInit() {
    this.clientSearch = {
      nombre: '',
      status: '',
      etapa: '',
      desarrollo: '',
      contacto: '',
      cuenta: '',
      user: '',
    };
  }
  async us2() {
    const storage = await this.storage.create();
    const cuenta = await this.storage.get('cuenta_id');
    const user = await this.storage.get('user_id');
    this.usuarioService.getDevelopmentsList(cuenta).subscribe(resp => {
      this.desarrollos = resp;
      this.cuentaUser = cuenta;
      this.user = user;
      //console.log(this.desarrollos);
    });
  }
  searchClient(fSearchClient: NgForm){
    if (fSearchClient.invalid) {
      return;
    }


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
  onDesarrolloChange() {
    if (this.clientSearch.desarrollo !== '') {
      this.inmuebleDisabled = false;
    } else {
      this.inmuebleValue = '';
      this.inmuebleDisabled = true;
    }
  }
}
