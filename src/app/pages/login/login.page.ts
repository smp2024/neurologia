/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import {FormGroup, FormBuilder, Validators}   from '@angular/forms';
import * as $ from 'jquery';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginUser = {
    email: '',
    password: '',
    remember: ''
  };
  //mensaje: [];
  message: any;
  @Input() mensaje;

  ionicForm: FormGroup;
  user: string;
  email: any;

  constructor(private usuarioService: UsuarioService,
              private naveCtrl: NavController,
              private storage: Storage,
              private uiService: UiServiceService,
              public formBuilder: FormBuilder,
              public loadingCtr: LoadingController) { this.as(); }

  ngOnInit() {

  }
  async as() {
    const storage = await this.storage.create();
    const userEmail = await this.storage.get('correo_electronico');
    console.log('email');

    console.log(userEmail);
    this.email = userEmail;
  }
  loading: HTMLIonLoadingElement;

  async login(fLogin: NgForm) {
    this.presentLoading('Cargando...');
    setTimeout(() => {
      this.loading.dismiss();
    }, 2000);
    if (fLogin.invalid) {
      return;
    }

    const valido = await this.usuarioService.login(this.loginUser.email,this.loginUser.password);

    if (valido['Ok']) {
      this.naveCtrl.navigateRoot('inicio', {animated: true});
      this.mensaje = valido['mensaje'];
      this.saveUserEmail(this.loginUser.email);
      console.log(valido['mensaje']);
    } else if (!valido['Ok']){
      this.error();
      this.mensaje = valido['mensaje'];
      console.log(valido['mensaje']);
    }

  }
  async saveUserEmail(user: string) {

    await this.storage.create();
    this.user = user;
    await this.storage.set('correo_electronico', user);
    const store = new Storage();

  };
  error() {
    $('#error').removeClass('d-none');
    $('.cont_input').addClass('input_error');
    $('.cont_input').css("background-color", "#a0445b !important");
    $('.cont_input').css("color", "#fff !important");

  }


  async presentLoading(message: string) {
    this.loading = await this.loadingCtr.create({
      message,
    });
    await  this.loading.present();
  }


}
