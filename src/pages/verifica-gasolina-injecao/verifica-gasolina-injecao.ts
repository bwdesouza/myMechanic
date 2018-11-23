import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VerificaGasolinaInjecaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verifica-gasolina-injecao',
  templateUrl: 'verifica-gasolina-injecao.html',
})
export class VerificaGasolinaInjecaoPage {
  img: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.img = navParams.get('img');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificaGasolinaInjecaoPage');
  }

}
