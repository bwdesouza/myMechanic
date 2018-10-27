import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Veiculo } from '../../views/veiculo';
import { RestProvider } from '../../providers/rest/rest';

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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public restProvider: RestProvider, 
    private toast: ToastController) {

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
        debugger       
        if(result.result)
        {
          this.toast.create({ message: 'Veículo cadastrado com sucesso. ', position: 'botton', duration: 3000 }).present();
        }
        else
        {          
          this.toast.create({ message: 'Falha ao cadastrar o veículo. ', position: 'botton', duration: 3000 }).present();
        }
      }
    );
    // this.restProvider.cadastrarVeiculo(this.veiculoSelect)
    //   .then((result: any) => {
    //     if(result.result)
    //     {
    //       this.toast.create({ message: 'Veículo cadastrado com sucesso. ', position: 'botton', duration: 3000 }).present();
    //     }
    //     else
    //     {          
    //       this.toast.create({ message: 'Falha ao cadastrar o veículo. ', position: 'botton', duration: 3000 }).present();
    //     }
    //     //Salvar o token no Ionic Storage para usar em futuras requisições.
    //     //Redirecionar o usuario para outra tela usando o navCtrl
    //     //this.navCtrl.pop();
    //     //this.navCtrl.setRoot()
    //   })
    //   .catch((error: any) => {
    //     this.toast.create({ message: 'Erro ao criar o usuário. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
    //   });
  }
}
