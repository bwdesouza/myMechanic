import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { Usuario } from '../../views/usuario';

/**
 * Generated class for the ModalServicoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-servico',
  templateUrl: 'modal-servico.html',
})
export class ModalServicoPage {
  loading: any;
  usuario: Usuario = null;
  veiculo: any = [];
  servicoSelect: any;
  veiculoSelect: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider,
    private storage: Storage,
    public loadingController: LoadingController,
    public viewCtrl: ViewController) {
debugger;
    this.servicoSelect = null;
    this.veiculoSelect = null;

    this.servicoSelect = navParams.get('servico');
    this.veiculoSelect = navParams.get('veiculo');

    this.loading = this.loadingController.create({ content: "Carregando.." });

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

      if(this.servicoSelect != undefined && this.servicoSelect != null)
        this.buscarVeiculo();
    });
  }

  public async getStorage(settingName) {
    return await this.storage.get(`setting:${settingName}`);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalServicoPage');
  }

  buscarVeiculo() {
    this.loading.present();

    this.restProvider.buscarVeiculo(this.usuario.email).subscribe(
      (result) => {
        this.veiculo = [];

        if (result.veiculo == null) {
          console.log("veiculo não encontrado!");
        }
        else {
          result.veiculo.forEach(veic => {
            var v = JSON.parse(veic);
            if (v.id == this.servicoSelect.veiculo) {
              this.servicoSelect.veiculoNome = v.apelido + " - " + v.modelo;
            }
            this.veiculo.push(v);
          });
        }

        this.loading.dismissAll();
      }
    );
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
