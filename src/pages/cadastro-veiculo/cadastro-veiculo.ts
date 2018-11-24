import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
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
  emailUsuario: string;
  loading: any;
  titulo: any = "Cadastrar veículo novo";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public restProvider: RestProvider, 
    private toast: ToastController,
    public loadingController: LoadingController) {

      
      this.logado = navParams.get('logado');
      this.tela = navParams.get('tela');
      this.emailUsuario = navParams.get('emailUsuario');
      this.veiculoSelect = navParams.get('veiculo');

      if(this.veiculoSelect == null){
        this.veiculoSelect = new Veiculo();
        this.veiculoSelect.id = 0;
      }
      else{
          this.titulo = "Atualizar veículo";
      }

      this.loading = this.loadingController.create({ content: "Carregando.." });
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroVeiculoPage');
  }

  SalvarVeiculo(){
    this.loading.present();

    this.veiculoSelect.emailUsuario = this.emailUsuario;
    this.restProvider.cadastrarVeiculo(this.veiculoSelect).subscribe(
      (result) => {  
        if(result.result)
        {
          var msg = "";
          if(this.veiculoSelect.id > 0)
          {
            if(result.linhasAfetadas > 0)
              msg = "Veículo atualizado com sucesso!";
            else
              msg = "Algo de errado aconteceu ao atualizar o veículo!";
              
            this.navCtrl.push(HelloIonicPage, {
              emailUsuario: this.emailUsuario
            });   
          }
          else
          {
              msg = "Veículo cadastrado com sucesso!";
              this.navCtrl.push(LoginPage);
          }
          
          this.toast.create({ message: msg, position: 'botton', duration: 3000 }).present();
        }
        else
        {          
          this.toast.create({ message: 'Falha ao cadastrar o veículo. ', position: 'botton', duration: 3000 }).present();
        }
        
        this.loading.dismissAll();
      }
    );
  }
}
