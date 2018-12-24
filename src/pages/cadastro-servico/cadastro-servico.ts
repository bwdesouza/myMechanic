import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Servico } from '../../views/servico';
import { Usuario } from '../../views/usuario';
import { RestProvider } from '../../providers/rest/rest';
import { FormBuilder, Validators } from '@angular/forms';
import { MeusServicosPage } from '../meus-servicos/meus-servicos';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CadastroServicoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-servico',
  templateUrl: 'cadastro-servico.html',
})
export class CadastroServicoPage {

  servicoSelect: Servico;
  emailUsuario: string;
  usuario: Usuario = null;
  loading: any;
  titulo: any = "Cadastrar novo serviço";
  veiculo: any = [];

  public cadForm: any;
  messageVeiculo = "";
  messageData = "";
  messageServico = "";
  messageMecanica = "";
  messageObservacao = "";
  messagePreco = "";
  errorVeiculo = false;
  errorData = false;
  errorServico = false;
  errorMecanica = false;
  errorObservacao = false;
  errorPreco = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider: RestProvider,
    private toast: ToastController,
    public loadingController: LoadingController,
    private storage: Storage,
    formBuilder: FormBuilder) {

    this.loading = this.loadingController.create({ content: "Carregando.." });

    this.cadForm = formBuilder.group({
      veiculo: ['', Validators.required],
      data: ['', Validators.required],
      servico: ['', Validators.required],
      mecanica: ['', Validators.required],
      observacao: ['', Validators.required],
      preco: ['', Validators.required]
    });

    let dados = this.getStorage("UsuarioLogado");
    dados.then((val) => {
      // console.log('Your age is', val);
      if (val != null && val != undefined) {
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

    this.emailUsuario = navParams.get('emailUsuario');
    this.servicoSelect = navParams.get('servico');

    if (this.servicoSelect == null) {
      this.servicoSelect = new Servico();
      this.servicoSelect.id = 0;
    }
    else {
      this.titulo = "Atualizar serviço";
    }

  }

  buscarVeiculo() {
    this.loading.present();

    this.restProvider.buscarVeiculo(this.usuario.email).subscribe(
      (result) => {
        this.veiculo = [];

        if (result.result) {
          if (result.veiculo == null) {
            this.toast.create({ message: "Você ainda não tem nenhum carro cadastrado!", position: 'botton', duration: 3000 }).present();
          }
          else {
            result.veiculo.forEach(veic => {
              var v = JSON.parse(veic);
              this.veiculo.push(v);
            });
          }
        }
        else {
          this.toast.create({ message: result.msg, position: 'botton', duration: 3000 }).present();
        }

        this.loading.dismissAll();
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroServicoPage');
  }

  public async getStorage(settingName) {
    return await this.storage.get(`setting:${settingName}`);
  }

  SalvarServico() {

    let { veiculo, data, servico, mecanica, observacao, preco } = this.cadForm.controls;

    if (!this.cadForm.valid) {
      if (!veiculo.valid) {
        this.errorVeiculo = true;
        this.messageVeiculo = "Ops! Escolha um veículo.";
      } else {
        this.messageVeiculo = "";
      }

      if (!data.valid) {
        this.errorData = true;
        this.messageData = "Ops! Preencha o campo Data.";
      } else {
        this.messageData = "";
      }

      if (!servico.valid) {
        this.errorServico = true;
        this.messageServico = "Ops! Preencha o campo Serviço.";
      } else {
        this.messageServico = "";
      }

      if (!mecanica.valid) {
        this.errorMecanica = true;
        this.messageMecanica = "Ops! Preencha o campo Mecanica.";
      } else {
        this.messageMecanica = "";
      }
      if (!observacao.valid) {
        this.errorObservacao = true;
        this.messageObservacao = "Ops! Preencha o campo Observação.";
      } else {
        this.messageObservacao = "";
      }

      if (!preco.valid) {
        this.errorPreco = true;
        this.messagePreco = "Ops! Preencha o campo Preço."
      } else {
        this.messagePreco = "";
      }

    }
    else {
      this.loading.present();

      this.servicoSelect.emailUsuario = this.usuario == null || this.usuario == undefined ? this.emailUsuario : this.usuario.email;

      this.restProvider.cadastrarServico(this.servicoSelect).subscribe(
        (result) => {
          if (result.result) {
            var msg = "";

            if (result.linhasAfetadas > 0) {
              if (this.servicoSelect.id == 0)
                msg = "Serviço cadastrado com sucesso!";
              else
                msg = "Serviço atualizado com sucesso!";
            }
            else {
              msg = "Algo de errado aconteceu ao atualizar o serviço!";
            }

            this.navCtrl.setRoot(MeusServicosPage);

            this.toast.create({ message: msg, position: 'botton', duration: 3000 }).present();
          }
          else {
            this.toast.create({ message: 'Falha ao cadastrar o veículo. ', position: 'botton', duration: 3000 }).present();
          }

          this.loading.dismissAll();
        }
      );
    }

  }

}
