import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { Usuario } from '../../views/usuario';
import { CadastroVeiculoPage } from '../cadastro-veiculo/cadastro-veiculo';

/**
 * Generated class for the MeusVeiculosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meus-veiculos',
  templateUrl: 'meus-veiculos.html',
})
export class MeusVeiculosPage {

  loading: any;
  usuario : Usuario;
  veiculo: any = [];

  constructor(public navCtrl: NavController,
    public restProvider: RestProvider, 
    private toast: ToastController, public navParams: NavParams,
    public loadingController: LoadingController,
    private storage: Storage) {
      
    this.loading = this.loadingController.create({ content: "Carregando.." });

      let dados = this.getStorage("UsuarioLogado");
      dados.then((val) => {
        console.log('Your age is', val);
        if(val != null && val != undefined){
          this.usuario = new Usuario();
          this.usuario.id = val.id;
          this.usuario.nome = val.nome;
          this.usuario.sobrenome = val.sobrenome;
          this.usuario.aniversario = val.aniversario;
          this.usuario.email = val.email;
          this.usuario.senha = val.senha;
          this.usuario.mecanico = val.mecanico;
        }

        this.buscarVeiculo();
      });
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeusVeiculosPage');
  }
  buscarVeiculo(){
    this.loading.present();
    
    this.restProvider.buscarVeiculo(this.usuario.email).subscribe(
      (result) => {
        if(result.result)
        {
          if(result.veiculo == null)
          {
              this.toast.create({ message: "Você ainda não tem nenhum carro cadastrado!" , position: 'botton', duration: 3000 }).present();
          }
          else
          {
            result.veiculo.forEach(veic => {
              var v = JSON.parse(veic);
              this.veiculo.push(v);
            });
          }
        }
        else
        {
          this.toast.create({ message: result.msg , position: 'botton', duration: 3000 }).present();
        }
        
        this.loading.dismissAll();
      }
    );
  }
  
  chamaCadastroVeic(veiculo){    
    this.navCtrl.push(CadastroVeiculoPage, {
      veiculo: veiculo,
      emailUsuario : this.usuario.email
    });
  }

  public async getStorage(settingName){
    return await this.storage.get(`setting:${ settingName }`);
  }

}
