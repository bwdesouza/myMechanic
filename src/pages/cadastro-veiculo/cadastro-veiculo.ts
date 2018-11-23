import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Veiculo } from '../../views/veiculo';
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage } from '../login/login';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';

/**
 * Generated class for the CadastroVeiculoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-veiculo',
  templateUrl: 'cadastro-veiculo.html',
})
export class CadastroVeiculoPage {

  veiculoSelect: Veiculo;
  logado: string;
  tela: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public restProvider: RestProvider, 
    private toast: ToastController) {

      
      this.logado = navParams.get('logado');
      this.tela = navParams.get('tela');
      this.veiculoSelect = navParams.get('veiculo');

      if(this.veiculoSelect == null){
        this.veiculoSelect = new Veiculo();
      }
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroVeiculoPage');
  }

  SalvarVeiculo(){
    this.restProvider.cadastrarVeiculo(this.veiculoSelect).subscribe(
      (result) => {  
        if(result.result)
        {
          this.toast.create({ message: 'Veículo cadastrado com sucesso. ', position: 'botton', duration: 3000 }).present();
          this.navCtrl.push(LoginPage);
        }
        else
        {          
          this.toast.create({ message: 'Falha ao cadastrar o veículo. ', position: 'botton', duration: 3000 }).present();
        }
      }
    );
  }
}
