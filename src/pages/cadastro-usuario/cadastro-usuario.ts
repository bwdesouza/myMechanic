import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Usuario } from '../../views/usuario';
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage } from '../login/login';
import { CadastroVeiculoPage } from '../cadastro-veiculo/cadastro-veiculo';
import { FormBuilder, Validators } from '@angular/forms';

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

  public cadForm: any;
  messageNome = "";
  messageSobrenome = "";
  messageData = "";
  messageEmail = "";
  messagePassword = "";
  messageConfPassword = "";
  errorNome = false;
  errorSobrenome = false;
  errorData = false;
  errorEmail = false;
  errorPassword = false;
  errorConfPassword = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider,
    private toast: ToastController,
    public loadingController: LoadingController,
    formBuilder: FormBuilder) {

    this.cadForm = formBuilder.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      aniversario: ['', Validators.required],
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      Validators.required])],
      senha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20),
      Validators.required])],
      confSenha: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20),
      Validators.required])],
    });

    this.logado = navParams.get('logado');
    this.tela = navParams.get('tela');
    this.usuarioAtualizar = navParams.get('usuarioAtualizar');

    if (this.usuarioAtualizar != null && this.usuarioAtualizar != undefined) {
      this.usuario = this.usuarioAtualizar;
      this.usuario.confSenha = this.usuarioAtualizar.senha;
    }

    if (this.logado == "Mecanico") {
      this.img = "../../assets/imgs/icons/mechanic.png";
    } else {
      this.img = "../../assets/imgs/icons/man.png";
    }

    this.loading = this.loadingController.create({ content: "Carregando.." });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroUsuarioPage');
  }

  SalvarUsuario() {

    let { nome, sobrenome, aniversario, email, senha, confSenha } = this.cadForm.controls;

    if (!this.cadForm.valid) {

      if (!nome.valid) {
        this.errorNome = true;
        this.messageNome = "Ops! Preencha o campo Nome.";
      } else {
        this.messageNome = "";
      }

      if (!sobrenome.valid) {
        this.errorSobrenome = true;
        this.messageSobrenome = "Ops! Preencha o campo Sobrenome.";
      } else {
        this.messageSobrenome = "";
      }

      if (!aniversario.valid) {
        this.errorData = true;
        this.messageData = "Ops! campo Aniversário está inválido.";
      } else {
        this.messageData = "";
      }
      if (!email.valid) {
        this.errorEmail = true;
        this.messageEmail = "Ops! campo Email está inválido.";
      } else {
        this.messageEmail = "";
      }

      if (!senha.valid) {
        this.errorPassword = true;
        this.messagePassword = "A senha precisa ter de 6 a 20 caracteres"
      } else {
        this.messagePassword = "";
      }

      if (!confSenha.valid) {
        this.errorConfPassword = true;
        this.messageConfPassword = "A confirmação da senha precisa ter de 6 a 20 caracteres"
      } else {
        this.messageConfPassword = "";
      }

    }
    else {
      if(this.usuario.email.indexOf(".com") == -1){
        this.toast.create({ message: "Campo Email precisa conter '.com'", position: 'botton', duration: 3000 }).present();
        return;
      }

      this.loading.present();

      if (this.logado == "Mecanico")
        this.usuario.mecanico = "1";
      else
        this.usuario.mecanico = "0";

      this.restProvider.cadastrarUsuario(this.usuario).subscribe(
        (result) => {

          if (result.result) {
            let msg = "Usuário atualizado com sucesso!";

            if (this.usuarioAtualizar == null || this.usuarioAtualizar == undefined) {
              if (this.logado == "Mecanico")
                this.navCtrl.setRoot(LoginPage);
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
          else {
            this.toast.create({ message: result.erro, position: 'botton', duration: 3000 }).present();
          }

          this.loading.dismissAll();
        }
      );

    }

  }
}