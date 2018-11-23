import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VerificaAguaReservatorioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verifica-agua-reservatorio',
  templateUrl: 'verifica-agua-reservatorio.html',
})
export class VerificaAguaReservatorioPage {
  img: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.img = navParams.get('img');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificaAguaReservatorioPage');
  }

}
