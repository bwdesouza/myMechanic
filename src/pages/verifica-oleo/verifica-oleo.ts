import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VerificaOleoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verifica-oleo',
  templateUrl: 'verifica-oleo.html',
})
export class VerificaOleoPage {
  img: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.img = navParams.get('img');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificaOleoPage');
  }

}
