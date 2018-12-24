import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { Usuario } from '../../views/usuario';
import { RestProvider } from '../../providers/rest/rest';
import { CadastroServicoPage } from '../cadastro-servico/cadastro-servico';
import { Storage } from '@ionic/storage';
import { ModalServicoPage } from '../modal-servico/modal-servico';

/**
 * Generated class for the MeusServicosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meus-servicos',
  templateUrl: 'meus-servicos.html',
})
export class MeusServicosPage {

  loading: any;
  usuario: Usuario;
  servicos: any = [];

  constructor(public navCtrl: NavController,
    public restProvider: RestProvider,
    private toast: ToastController, public navParams: NavParams,
    public loadingController: LoadingController,
    private storage: Storage,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController) {

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
  
        this.buscarServicos();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeusServicosPage');
  }  

  abreServicoModal(serv) {
    debugger;
    let servicoModal = this.modalCtrl.create(ModalServicoPage, {servico : serv});
    servicoModal.present();
  }
  
  buscarServicos() {
    this.loading.present();

    this.restProvider.buscarServico(this.usuario.email).subscribe(
      (result) => {
        this.servicos = [];

        if (result.result) {
          if (result.servicos == null) {
            this.toast.create({ message: "Você ainda não tem nenhum serviço cadastrado!", position: 'botton', duration: 3000 }).present();
          }
          else {
            result.servicos.forEach(serv => {
              var s = JSON.parse(serv);
              let dia = s.data.split('-')[2];
              let mes = s.data.split('-')[1];
              let ano = s.data.split('-')[0];
              s.dataString = dia + "/" + mes  + "/" + ano;
              this.servicos.push(s);
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

  chamaCadastroServ(servico) {
    this.navCtrl.push(CadastroServicoPage, {
      servico: servico,
      emailUsuario: this.usuario.email
    });
  }

  public async getStorage(settingName) {
    return await this.storage.get(`setting:${settingName}`);
  }

  showAlert(serv) {
    const prompt = this.alertCtrl.create({
      title: 'Confirmação',
      message: "Tem certeza que deseja excluir este serviço ?",
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            
          }
        },
        {
          text: 'Confirmar',
          handler: data => {
            this.loading.present();
            this.excluirServico(serv.id);
          }
        }
      ]
    });
    prompt.present();
  }

  public excluirServico(id: number) {
    this.restProvider.excluirServico(id).subscribe(
      (result) => {
        if (result.result) {
          var msg = "";
          if (result.linhasAfetadas > 0) {
            msg = "Serviço foi excluído com sucesso!";
            this.buscarServicos();
          }
          else {
            msg = "Algo de errado aconteceu, por favor tente mais tarde!";
          }
        }
        else {
          msg = result.erro;
        }

        this.toast.create({ message: msg, position: 'botton', duration: 3000 }).present();
        this.loading.dismissAll();
      }
    );
  }

}
