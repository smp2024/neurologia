/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit, Input  } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UsuarioService } from 'src/app/services/usuario.service';
import { inmuebles } from '../../interfaces';
import * as $ from 'jquery';
@Component({
  selector: 'app-properties',
  templateUrl: './properties.page.html',
  styleUrls: ['./properties.page.scss'],
})
export class PropertiesPage implements OnInit {
  public inmuebles: any;
  portada: string;
  desarrollos: any;
  desarrolloId: any;
  constructor(
    private naveCtrl: NavController,
    private storage: Storage,
    private usuarioService: UsuarioService
  ) { this.devs();}


  ngOnInit() {

  }

  async devs() {
    const storage = await this.storage.create();
    const desarrolloId = await this.storage.get('desarrollo_id');
    const desarrollos = await this.storage.get('desarrollos');

    this.desarrollos = desarrollos;
    this.desarrolloId = desarrolloId;
    // console.log(this.desarrolloId);
    this.verInmueble(desarrolloId);

  }
  async verDeatelle(id: string) {

    await this.storage.create();
    await this.storage.remove('desarrollo_id');
    await this.storage.set('desarrollo_id', id);
    const store = new Storage();

    this.naveCtrl.navigateRoot('/view-development', {animated: true});


  };

  verInmueble(id: string) {
    console.log(id);

   this.usuarioService.getInmueblesList(id).subscribe( (resp: inmuebles) => {
    this.inmuebles = resp;
      console.log(this.inmuebles);
    });

  };


}


