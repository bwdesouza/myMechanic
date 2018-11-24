import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
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
  usuarioAtualizar: Usuario;

  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider, 
    private toast: ToastController,
    public loadingController: LoadingController) {

      this.logado = navParams.get('logado');
      this.tela = navParams.get('tela');
      this.usuarioAtualizar = navParams.get('usuarioAtualizar');

      if(this.usuarioAtualizar != null && this.usuarioAtualizar != undefined){
        this.usuario = this.usuarioAtualizar;
        this.usuario.confSenha = this.usuarioAtualizar.senha;
      }

      if(this.logado == "Mecanico"){
        this.img = "../../assets/imgs/icons/mechanic.png";
      }else{
        this.img = "../../assets/imgs/icons/man.png";
      }

      this.loading = this.loadingController.create({ content: "Carregando.." });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroUsuarioPage');
  }

  SalvarUsuario(){
    this.loading.present();

    if(this.logado == "Mecanico")
      this.usuario.mecanico = "1";
    else
      this.usuario.mecanico = "0";

    this.restProvider.cadastrarUsuario(this.usuario).subscribe(
      (result) => {
        debugger;
        if(result.result)
        { 
          let msg = "Usuário atualizado com sucesso!";
          
          if(this.usuarioAtualizar == null || this.usuarioAtualizar == undefined)
          {
              if(this.logado == "Mecanico")
                this.navCtrl.push(LoginPage);  
              else            
                this.navCtrl.push(CadastroVeiculoPage, {
                  logado: this.logado,
                  tela: "cadastroUsuario",
                  emailUsuario: this.usuario.email
                });  

              msg = "Usuário cadastrado com sucesso!";
          }

          this.toast.create({ message: msg, position: 'botton', duration: 3000 }).present();      
        }
        else
        {          
          this.toast.create({ message: result.erro , position: 'botton', duration: 3000 }).present();
        }
        
        this.loading.dismissAll();
      }
    );
  }
}