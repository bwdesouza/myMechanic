import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Usuario } from '../../views/usuario';
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage } from '../login/login';
import { CadastroVeiculoPage } from '../cadastro-veiculo/cadastro-veiculo';

/**
 * Generated class for the CadastroUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-usuario',
  templateUrl: 'cadastro-usuario.html',
})
export class CadastroUsuarioPage {

  usuario: Usuario = new Usuario();
  logado: any;
  img: string;
  tela: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider, 
    private toast: ToastController) {

      this.logado = navParams.get('logado');
      this.tela = navParams.get('tela');

      if(this.logado == "Cliente"){
        this.img = "../../assets/imgs/icons/man.png";
      }else{
        this.img = "../../assets/imgs/icons/mechanic.png";
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroUsuarioPage');
  }

  SalvarUsuario(){
    if(this.logado == "Mecanico")
      this.usuario.mecanico = "1";
    else
      this.usuario.mecanico = "0";

    this.restProvider.cadastrarUsuario(this.usuario).subscribe(
      (result) => {
        debugger       
        if(result.result)
        {
          this.toast.create({ message: 'Usuário cadastrado com sucesso! ', position: 'botton', duration: 3000 }).present();          
          if(this.logado == "Mecanico")
            this.navCtrl.push(LoginPage);  
          else            
            this.navCtrl.push(CadastroVeiculoPage);  
        }
        else
        {          
          this.toast.create({ message: 'Falha ao cadastrar novo usuário! ', position: 'botton', duration: 3000 }).present();
        }
      }
    );
  }
}



    // this.toast.create({ message: 'Usuário cadastrado com sucesso! ', position: 'botton', duration: 3000 }).present();
    
    // if(this.logado == "Cliente"){
    //   if(this.tela == "login"){
    //     this.navCtrl.push(CadastroVeiculoPage, {
    //       logado: this.logado,
    //       tela: this.tela
    //     });  
    //   }
    // }
    // else
    // {      
    //   this.navCtrl.push(LoginPage);  
    // }
