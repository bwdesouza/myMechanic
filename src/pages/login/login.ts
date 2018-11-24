import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { Storage } from '@ionic/storage';
import { Usuario } from '../../views/usuario';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  login: string;
  senha: string;
  
  usuario = new Usuario();

  loading: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public restProvider: RestProvider, 
    private toast: ToastController,
    public loadingController: LoadingController,
    private storage: Storage) 
    {      
        this.loading = this.loadingController.create({ content: "Carregando.." });
        
        this.setStorage("UsuarioLogado", null);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  MeCadastrar(logado){
    this.navCtrl.push(CadastroUsuarioPage, {
      logado: logado,
      tela: "login"
    });    
  }
  
  Login(){
    this.loading.present();

    this.restProvider.loginUsuario(this.login, this.senha).subscribe(
      (result) => {
        if(result.result)
        {
          this.toast.create({ message: 'Usuário logado com sucesso! ', position: 'botton', duration: 3000 }).present();
          
          this.navCtrl.setRoot(HelloIonicPage);

          var usu = JSON.parse(result.usuario);

          this.usuario.id = usu.id;
          this.usuario.nome = usu.nome;
          this.usuario.sobrenome = usu.sobrenome;
          this.usuario.aniversario = usu.aniversario;
          this.usuario.email = usu.email;
          this.usuario.senha = usu.senha;
          this.usuario.mecanico = usu.mecanico;

          this.setStorage("UsuarioLogado", this.usuario);
        }
        else
        {          
          this.toast.create({ message: result.msg , position: 'botton', duration: 3000 }).present();
        }
        
        this.loading.dismissAll();
      }
    );
  }
  

  public setStorage(settingName, value){
    return this.storage.set(`setting:${ settingName }`,value);
  }
  public async getStorage(settingName){
    return await this.storage.get(`setting:${ settingName }`);
  }
  public async removeStorage(settingName){
    return await this.storage.remove(`setting:${ settingName }`);
  }

}
