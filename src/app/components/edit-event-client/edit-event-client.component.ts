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
import { InfoAdviser } from '../../interfaces/index';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import * as $ from 'jquery';
@Component({
  selector: 'app-edit-event-client',
  templateUrl: './edit-event-client.component.html',
  styleUrls: ['./edit-event-client.component.scss'],
})
export class EditEventClientComponent implements OnInit {

  clientAdd = {
    nombre: '',
    email: '',
    telefono: '',
    inmueble: '',
    desarrollo: '',
    contacto: '',
    cuenta: '',
    user: '',

  };

  desarrolloValue: string;
  inmuebleValue: string;
  inmuebleDisabled = true;
  public cuenta: any;
  public desarrollos: any;

  ionicForm: FormGroup;

  @Input() mensaje;
  cuentaUser: any;
  user: any;
  constructor(private http: HttpClient,
    private storage: Storage,
    private naveCtrl: NavController,
    private usuarioService: UsuarioService,
    public formBuilder: FormBuilder
  ) { this.us2(); }
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

  ngOnInit() {
    this.clientAdd = {
      nombre: '',
      email: '',
      telefono: '',
      inmueble: '',
      desarrollo: '',
      contacto: '',
      cuenta: '',
      user: '',
    };
  }
  onDesarrolloChange() {
    if (this.clientAdd.desarrollo !== '') {
      this.inmuebleDisabled = false;
    } else {
      this.inmuebleValue = '';
      this.inmuebleDisabled = true;
    }
  }
  async addClients(fAddClient: NgForm) {

    if (fAddClient.invalid) {
      return;
    }

    const storage = await this.storage.create();
    const cuenta = await this.storage.get('cuenta_id');
    const user = await this.storage.get('user_id');
    this.usuarioService.addClient(
      this.clientAdd.nombre,
      this.clientAdd.email,
      this.clientAdd.telefono,
      this.clientAdd.contacto,
      this.clientAdd.desarrollo,
      this.clientAdd.inmueble,
      cuenta,
      user,
      ).subscribe(resp => {
      if (resp['Ok']) {
        const icono = '<i class="fas fa-check-circle"></i>';
        this.openModal( resp['mensaje'], icono);
        this.cancel();
      } else if (!resp['Ok']){
        const icono = '<i class="fas fa-times-circle"  style="color: red !important;"></i>';
        this.openModal( resp['mensaje'], icono);
        this.cancel();
      }
    });


  }
  openModal(mensaje: string, icono: string){
    this.mensaje = mensaje;
    console.log(mensaje);

    $('#response').removeClass('d-none');
    document.getElementById("icono").innerHTML = icono;
    document.getElementById("respuesta").innerHTML = mensaje;
    setTimeout(() => {
      this.closeresp();
    }, 2000);
  }
  closeresp(){
    $('#response').addClass('d-none');
  }
  @ViewChild(IonModal) modal: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.ngOnInit();
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    this.message = `Hello!`;
  }

}
