import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Veiculo } from '../../views/veiculo';
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage } from '../login/login';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { Usuario } from '../../views/usuario';
import { Storage } from '@ionic/storage';
import { FormBuilder, Validators } from '@angular/forms';

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
  usuario: Usuario = null;
  loading: any;
  titulo: any = "Cadastrar novo veículo";


  public cadForm: any;
  messageApelido = "";
  messageMarca = "";
  messageModelo = "";
  messagePlaca = "";
  messageKm = "";
  messageTrOleo = "";
  messageTrCorreia = "";
  errorApelido = false;
  errorMarca = false;
  errorModelo = false;
  errorPlaca = false;
  errorKm = false;
  errorTrOleo = false;
  errorTrCorreia = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider: RestProvider,
    private toast: ToastController,
    public loadingController: LoadingController,
    private storage: Storage,
    formBuilder: FormBuilder) {

    this.cadForm = formBuilder.group({
      apelido: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      placa: ['', Validators.required],
      km: ['', Validators.required],
      trOleo: ['', Validators.compose([Validators.maxLength(7), Validators.required])],
      trCorreia: ['', Validators.compose([Validators.maxLength(7), Validators.required])],
    });

    // placa: ['', Validators.compose([Validators.pattern('^[a-zA-Z]{3}\-\d{4}$'),
    // Validators.required])],

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
    });

    this.logado = navParams.get('logado');
    this.tela = navParams.get('tela');
    this.emailUsuario = navParams.get('emailUsuario');
    this.veiculoSelect = navParams.get('veiculo');

    if (this.veiculoSelect == null) {
      this.veiculoSelect = new Veiculo();
      this.veiculoSelect.id = 0;
    }
    else {
      this.titulo = "Atualizar veículo";
    }

    this.loading = this.loadingController.create({ content: "Carregando.." });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroVeiculoPage');
  }

  SalvarVeiculo() {

    let { apelido, marca, modelo, placa, km, trOleo, trCorreia } = this.cadForm.controls;

    if (!this.cadForm.valid) {
      if (!apelido.valid) {
        this.errorApelido = true;
        this.messageApelido = "Ops! Preencha o campo Apelido.";
      } else {
        this.messageApelido = "";
      }

      if (!marca.valid) {
        this.errorMarca = true;
        this.messageMarca = "Ops! Preencha o campo Marca.";
      } else {
        this.messageMarca = "";
      }

      if (!modelo.valid) {
        this.errorModelo = true;
        this.messageModelo = "Ops! Preencha o campo Modelo.";
      } else {
        this.messageModelo = "";
      }

      if (!placa.valid) {
        this.errorPlaca = true;
        this.messagePlaca = "Ops! Preencha o campo Placa no formato XXX-9999.";
      } else {
        this.messagePlaca = "";
      }
      if (!km.valid) {
        this.errorKm = true;
        this.messageKm = "Ops! Campo KM deve conter no máximo 7 dígitos.";
      } else {
        this.messageKm = "";
      }

      if (!trOleo.valid) {
        this.errorTrOleo = true;
        this.messageTrOleo = "Ops! Campo Troca e óleo deve conter no máximo 7 dígitos."
      } else {
        this.messageTrOleo = "";
      }

      if (!trCorreia.valid) {
        this.errorTrCorreia = true;
        this.messageTrCorreia = "Ops! Campo Troca da correia dentada deve conter no máximo 7 dígitos."
      } else {
        this.messageTrCorreia = "";
      }

    }
    else {
      if (this.veiculoSelect.placa.length < 7) {
        this.toast.create({ message: "O formato da placa deve ser XXX-9999", position: 'botton', duration: 3000 }).present();
        return;
      }

      // let iniPlaca = this.veiculoSelect.placa.split('-');
      // let placa1 = this.isNumeric(iniPlaca[0]);
      // let placa2 = this.isNumeric(iniPlaca[1]);
      // if (placa1 == true || placa2 == false) {
      //   this.toast.create({ message: "O formato da placa deve ser XXX-9999", position: 'botton', duration: 3000 }).present();
      //   return;
      // }

      this.loading.present();

      this.veiculoSelect.emailUsuario = this.usuario == null || this.usuario == undefined ? this.emailUsuario : this.usuario.email;
      this.veiculoSelect.placa = this.veiculoSelect.placa.toUpperCase();

      this.restProvider.cadastrarVeiculo(this.veiculoSelect).subscribe(
        (result) => {
          if (result.result) {
            var msg = "";
            if (this.veiculoSelect.id > 0 || (this.usuario != null && this.usuario != undefined)) {
              if (result.linhasAfetadas > 0) {
                if (this.veiculoSelect.id == 0)
                  msg = "Veículo cadastrado com sucesso!";
                else
                  msg = "Veículo atualizado com sucesso!";
              }
              else {
                msg = "Algo de errado aconteceu ao atualizar o veículo!";
              }

              this.navCtrl.setRoot(HelloIonicPage, {
                emailUsuario: this.emailUsuario
              });
            }
            else {
              msg = "Veículo cadastrado com sucesso!";
              this.navCtrl.setRoot(LoginPage);
            }

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

  public async getStorage(settingName) {
    return await this.storage.get(`setting:${settingName}`);
  }

  public isNumeric(str) {
    var er = /^[0-9]+$/;
    return (er.test(str));
  }

}
