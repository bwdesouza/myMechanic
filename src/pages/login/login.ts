import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  login: string;
  senha: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider, 
    private toast: ToastController) {
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
    this.restProvider.loginUsuario(this.login, this.senha).subscribe(
      (result) => {
        if(result.result)
        {
          this.toast.create({ message: 'Usuário logado com sucesso! ', position: 'botton', duration: 3000 }).present();
          
          this.navCtrl.push(HelloIonicPage);   
        }
        else
        {          
          this.toast.create({ message: result.msg , position: 'botton', duration: 3000 }).present();
        }
      }
    );
  }

}
