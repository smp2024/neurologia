/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit, ViewChild,ElementRef } from '@angular/core';
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
  selector: 'app-add-event-client',
  templateUrl: './add-event-client.component.html',
  styleUrls: ['./add-event-client.component.scss'],
})
export class AddEventClientComponent implements OnInit {
  clientAdd = {
    clienteid: '',
    fecha: '',
    tipoevento: '',
    ubicacion: '',
    hora: '',
    minutos: '',
    recordatorio1: '',
    recordatorio2: '',
    cuenta: '',
    user: '',

  };


  public cuenta: any;

  ionicForm: FormGroup;

  @Input() mensaje;
  user: any;
  cliente_name: any;
  cliente_id: any;
  dateDos: any;
  constructor(private http: HttpClient,
    private storage: Storage,
    private naveCtrl: NavController,
    private usuarioService: UsuarioService,
    private elementRef: ElementRef,
    public formBuilder: FormBuilder
  ) { this.as(); }


  ngOnInit() {
    this.clientAdd = {
      clienteid: '',
      fecha: '',
      tipoevento: '',
      ubicacion: '',
      hora: '',
      minutos: '',
      recordatorio1: '',
      recordatorio2: '',
      cuenta: '',
      user: '',
    };
  }

  async as() {
    const storage = await this.storage.create();


    const cliente_name = await this.storage.get('cliente_name');
    this.cliente_name = cliente_name;

    const cliente_id = await this.storage.get('cliente_id');
    this.cliente_id = cliente_id;

  }
  async addClients(fAddClient: NgForm) {

    if (fAddClient.invalid) {
      return;
    }

    const storage = await this.storage.create();
    const cuentaid = await this.storage.get('cuenta_id');
    const user = await this.storage.get('user_id');
    this.usuarioService.addClient(
      this.clientAdd.clienteid,
      this.clientAdd.fecha,
      this.clientAdd.tipoevento,
      this.clientAdd.ubicacion,
      this.clientAdd.hora,
      this.clientAdd.minutos,
      cuentaid,
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
  formattedDate: string;
  validateButton(){
    const d: Date = new Date();
    const text: string = d.toLocaleDateString('es', { dateStyle: 'long' });
    $("#datetimeValue").text(text);
    this.dateDos =  $("#datetime_j").val(); // Encuentra el elemento con el atributo ng-reflect-model
    const datetimeElement = this.elementRef.nativeElement.querySelector('#datetime_j');

    // const ngReflectModelValue = $("#datetimeValue").getAttribute('ng-reflect-model');
    const fechaOriginal = new Date(this.dateDos);


    // Obtener componentes de fecha y hora
      const dia = fechaOriginal.getDate();
      const mes = fechaOriginal.toLocaleDateString('es', { month: 'long' });
      const año = fechaOriginal.getFullYear();
      const hora = fechaOriginal.getHours();
      const minutos = fechaOriginal.getMinutes();

      // Crear la cadena de fecha y hora formateada
      const fechaFormateada = `${dia} de ${mes} de ${año} a las ${hora}:${minutos}`;

    $("#datetimeValue").text(fechaFormateada);
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
