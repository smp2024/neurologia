/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import {
  InfoAdviser,
  clientList,
  recoverPassword,
  developments,
  events,
  inmuebles,
  addEvent,
  clientView,
} from '../interfaces';
import { empty, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  @Input() message;
  user: string = null;
  email: string = null;
  adviserId: string = null;
  mensaje: string = null;
  clienteId: string = null;
  fechaInicio: string = null;
  inmuebleId: string = null;

  fecha: string;
  direccion: string;
  cliente: string;
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private naveCtrl: NavController
  ) {}

  /* ----------------------------- Iniciar sesion ----------------------------- */

    login(email: string, password: string) {
      const data = { email, password };
      const dataUser = {
        email: data.email,
        password: data.password,
        api_key: 'SMP'
      };

      return new Promise((resolve) => {
        this.http
          .post(`http://127.0.0.1:8000/api/login`, dataUser)
          .subscribe((resp) => {
            console.log(resp['flag']);
            if (resp['flag'] === true) {
              this.message = resp['mensaje'];
              resolve(resp);
            }
            if (!resp['flag']) {
              resolve(resp);
              this.message = resp['mensaje'];
            }
          });
      });
    }

  /* -------------------------------------------------------------------------- */


  /* ------------------------- informacion del asesor ------------------------- */
    async infoAdvi(id: string) {
      const data = { id };

      return new Promise((resolve) => {
        this.http
          .post(`http://localhost/adryo-beta/appapis/get_advisor_info`, data)
          .subscribe((resp) => {
            console.log(resp);
            if (resp != null) {
              this.saveUserPhone(resp[0].user_phone);
              this.saveUserName(resp[0].user_name);
              this.saveUserAvatar(resp[0].user_Photo);
              resolve(true);
            } else {
              console.log(resp['mensaje']);
              resolve(false);
              this.message = resp['mensaje'];
            }
          });
      });
    }

    async saveUserAvatar(user: string) {
      await this.storage.create();
      await this.storage.set('user_avatar', user);
      const store = new Storage();
    }

    async saveUserName(nameUser: string) {
      await this.storage.create();
      await this.storage.set('user_name', nameUser);
      const store = new Storage();
    }

    async saveUserEmail(user: string) {
      await this.storage.create();
      await this.storage.set('correo_electronico', user);
      const store = new Storage();
    }

    async savePassword(password: string) {
      await this.storage.create();
      await this.storage.set('password', password);
      const store = new Storage();
    }

    async saveUserPhone(user: string) {
      await this.storage.create();
      await this.storage.set('telefono1', user);
      const store = new Storage();
    }

    async saveUserId(user: string) {
      await this.storage.create();
      this.user = user;
      await this.storage.set('user_id', user);
      const store = new Storage();
    }

    async saveUserFoto(user: string) {
      await this.storage.create();
      this.user = user;
      await this.storage.set('cuenta_logo', user);
      const store = new Storage();
    }

    async saveUserCuenta(user: string) {
      await this.storage.create();
      this.user = user;
      await this.storage.set('cuenta_id', user);
      const store = new Storage();
    }

    async saveUserBiometric() {
      await this.storage.create();
      await this.storage.set('bio', '1');
      const store = new Storage();
    }

  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Cerrar Sesion ----------------------------- */

    logout() {
      this.user = null;
      this.naveCtrl.navigateRoot('/login', { animated: true });
      this.storage.clear();
    }

  /* -------------------------------------------------------------------------- */

  /* -------------------------- Recuperar contraseña -------------------------- */

    recover(email: string): Observable<recoverPassword> {
      const data = { email };
      const url = 'https://beta.adryo.com.mx/users/app_send_mail_recovery';

      return this.http.post<recoverPassword>(url, data).pipe(map((resp) => resp));
    }

  /* -------------------------------------------------------------------------- */

  /* ----------------------------- Navegacion/Inicio/configuracion ----------------------------- */

    getUserData(id: string): Observable<InfoAdviser> {
      const data = { id };

      const dataUser = {
        id: data.id,
      };

      const url = 'http://localhost/adryo-beta/appapis/get_advisor_info';

      return this.http.post<InfoAdviser>(url, dataUser).pipe(map((resp) => resp));
    }

  /* -------------------------------------------------------------------------- */


  /* ----------------------------- Lista de Clientes ----------------------------- */

    getClientList(adviserId: string, cuentaId: string): Observable<clientList> {
      const data = { adviserId, cuentaId };

      const dataUser = {
        cuenta_id: data.cuentaId,
        email_id: data.adviserId,
      };

      const url = 'http://localhost/adryo-beta/clientes/get_clientes_info';
      //console.log(data);

      return this.http.post<clientList>(url, dataUser).pipe(map((resp) => resp));
    }

  /* -------------------------------------------------------------------------- */

  /* ----------------------------- Agregar Cliente ----------------------------- */

    addClient(
      nombre: string,
      email: string,
      telefono: string,
      contacto: string,
      desarrollo: string,
      inmueble: string,
      cuenta: string,
      user: string,): Observable<developments> {
      const dataUser = {
        nombre,
        email,
        telefono,
        contacto,
        desarrollo,
        inmueble,
        cuenta,
        user
      };

      const data = {
        nombre: dataUser.nombre,
        correo_electronico: dataUser.email,
        telefono1: dataUser.telefono,
        linea_contacto: dataUser.contacto,
        desarrollo: dataUser.desarrollo,
        propiedad_id: dataUser.inmueble,
        cuenta_id: dataUser.cuenta,
        asesor_id: dataUser.user,
        token: '617316ac17a31',
        tipo_cliente: '1',
        comentario: 'agregado desde app'

      };
      console.log(data);

      const url = 'http://localhost/adryo-beta/clientes/add_cliente_api';

      return this.http.post(url, data).pipe(map(
        (resp) =>  resp,
      ));


      // return new Promise((resolve) => {
      //   this.http
      //     .post(`http://localhost/adryo-beta/ClientsApps/addClientApp`, data)
      //     .subscribe((resp) => {
      //       console.log(resp);
      //       if (resp['Ok']) {
      //         console.log(data);
      //         this.message = resp['mensaje'];
      //         resolve(resp);
      //       }
      //       if (!resp['Ok']) {
      //         console.log(resp['mensaje']);
      //         resolve(resp);
      //         this.message = resp['mensaje'];
      //       }
      //     });
      // });

    }

  /* -------------------------------------------------------------------------- */

  /* ----------------------------- Vista de Cliente ----------------------------- */
    getClientView(clienteId: string): Observable<clientView> {
      const data = { clienteId };

      const dataUser = {
        cliente_id: data.clienteId,
      };

      const url = 'http://localhost/adryo-beta/AppApis/view_info_cliente';
      //console.log(data);

      return this.http.post<clientView>(url, dataUser).pipe(map((resp) => resp));
    }
  /* -------------------------------------------------------------------------- */

  /* ----------------------------- Editar Cliente ----------------------------- */

  /* -------------------------------------------------------------------------- */

  /* ----------------------------- Agregar Desarrollo a Cliente ----------------------------- */

  /* -------------------------------------------------------------------------- */

  /* ----------------------------- Agregar Inmueble a Cliente ----------------------------- */

  /* -------------------------------------------------------------------------- */

  /* ----------------------------- Agregar Seguimiento rapido a Cliente ----------------------------- */

  /* -------------------------------------------------------------------------- */


  /* ----------------------------- Lista de Desarrollos ----------------------------- */

    getDevelopmentsList(cuentaId: string): Observable<developments> {
      const data = { cuentaId };

      const dataUser = {
        cuenta_id: data.cuentaId,
      };

      const url = 'http://localhost/adryo-beta/desarrollos/get_desarrollo_app';

      return this.http
        .post<developments>(url, dataUser)
        .pipe(map((resp) => resp));
    }

  /* -------------------------------------------------------------------------- */

  /* --------------------------- Vista de Desarrollo -------------------------- */

    getDevelopment(
      cuentaId: string,
      desarrolloId: string
    ): Observable<developments> {
      const data = { cuentaId, desarrolloId };

      const dataUser = {
        cuenta_id: data.cuentaId,
        desarrollo_id: data.desarrolloId,
      };

      const url = 'http://localhost/adryo-beta/desarrollos/get_index_app';

      return this.http
        .post<developments>(url, dataUser)
        .pipe(map((resp) => resp));
    }

  /* -------------------------------------------------------------------------- */

  /* ----------------------------- Galeria Desarrollo ----------------------------- */

  /* -------------------------------------------------------------------------- */


  /* ----------------------------- Lista de Eventos ----------------------------- */

    getEvetnsList(userEmail: string): Observable<events> {
      const data = { userEmail };

      const dataUser = {
        user_email: data.userEmail,
        api_key: 'app',
      };

      const url = 'http://localhost/adryo-beta/events/get_events_list';

      return this.http.post<events>(url, dataUser).pipe(map((resp) => resp));
    }

  /* -------------------------------------------------------------------------- */

  /* ----------------------------- Agreggar Evento ---------------------------- */

    addEvent(
      clienteid: string,
      fecha: string,
      tipoevento: string,
      ubicacion: string,
      hora: string,
      minutos: string,
      recordatorio1: string,
      recordatorio2: string,
      cuenta: string,
      user: string,): Observable<addEvent> {
      const dataUser = {
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
      const data = {
        cliente_id: dataUser.clienteid,
        fecha: dataUser.fecha,
        tipo_evento: dataUser.tipoevento,
        ubicacion: dataUser.ubicacion,
        desarrollo_id: dataUser.minutos,
        recordatorio1: dataUser.recordatorio1,
        recordatorio2: dataUser.recordatorio2,
        cuenta_id: dataUser.cuenta,
        user_id: dataUser.user,
        api_key: 'App',
      };

      const url = 'http://localhost/adryo-beta/events/add_events';

      return this.http.post(url, data).pipe(map(
        (resp) =>  resp,
      ));

    }

  /* -------------------------------------------------------------------------- */

  /* ----------------------------- Cancelar Evento ----------------------------- */

    @Output() clickEvent = new EventEmitter();

    postCancelEvent(eventoId: string, motivoCancelacion: string){
      const data = { eventoId, motivoCancelacion };

      const dataUser = {
        motivo_cancelacion: data.motivoCancelacion,
        evento_id: data.eventoId,
        api_key: 'app',
      };

      return new Promise((resolve) => {
        this.http
          .post(`http://localhost/adryo-beta/events/cancel_events`, data)
          .subscribe((resp) => {
            //console.log(resp);
            if (resp['Ok']) {
              resolve(resp);
            }
            if (!resp['Ok']) {
              resolve(resp);
            }
          });
      });


    }

  /* -------------------------------------------------------------------------- */

  /* ----------------------------- Confirmar Evento ----------------------------- */

  /* -------------------------------------------------------------------------- */


  /* ----------------------------- Lista de Inmuebles ----------------------------- */

    getInmueblesList(desarrolloId: string): Observable<developments> {
      const data = { desarrolloId };

      const dataUser = {
        api_key: 'adryo',
        desarrollo_id: data.desarrolloId,
      };

      const url =
        'http://localhost/adryo-beta/desarrollos/get_unidades_desarrollo';

      return this.http.post<inmuebles>(url, dataUser).pipe(map((resp) => resp));
    }

  /* -------------------------------------------------------------------------- */

  /* ----------------------------- Vista de Inmueble ----------------------------- */

  /* -------------------------------------------------------------------------- */

  /* ----------------------------- Galeria Inmueble ----------------------------- */

  /* -------------------------------------------------------------------------- */


  /* ----------------------------- Embudo de Ventas ----------------------------- */

  /* -------------------------------------------------------------------------- */

  /* ----------------------------- Busqueda Embudo de Ventas ----------------------------- */

  /* -------------------------------------------------------------------------- */


    /* ----------------------------- Lista de linea de contacto ----------------------------- */
    getLineaContacto(cuentaId: string): Observable<InfoAdviser> {
      const data = { cuentaId };

      const dataUser = {
        cuenta_id: data.cuentaId,
      };

      const url = 'http://localhost/adryo-beta/appapis/get_linea_contacto';

      return this.http.post<InfoAdviser>(url, dataUser).pipe(map((resp) => resp));
    }

  /* -------------------------------------------------------------------------- */

}
