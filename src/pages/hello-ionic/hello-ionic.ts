import { Component } from '@angular/core';
import { CadastroVeiculoPage } from '../cadastro-veiculo/cadastro-veiculo';
import { NavController, AlertController, ToastController, NavParams, LoadingController } from 'ionic-angular';
import { Veiculo } from '../../views/veiculo';
import { VerificaOleoPage } from '../verifica-oleo/verifica-oleo';
import { VerificaAguaReservatorioPage } from '../verifica-agua-reservatorio/verifica-agua-reservatorio';
import { VerificaAguaRadiadorPage } from '../verifica-agua-radiador/verifica-agua-radiador';
import { VerificaGasolinaInjecaoPage } from '../verifica-gasolina-injecao/verifica-gasolina-injecao';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { Usuario } from '../../views/usuario';
import { CadastroUsuarioPage } from '../cadastro-usuario/cadastro-usuario';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

veiculo: Veiculo;
emailUsuario: string;
usuario : Usuario = new Usuario();
img: string;

loading: any;

cadastroVeiculoPage = CadastroVeiculoPage;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController,
    public restProvider: RestProvider, 
    private toast: ToastController, public navParams: NavParams,
    public loadingController: LoadingController,
    private storage: Storage) {

      let dados = this.getStorage("UsuarioLogado");
      dados.then((val) => {
        console.log('Your age is', val);
        if(val != null && val != undefined){
          this.usuario.id = val.id;
          this.usuario.nome = val.nome;
          this.usuario.sobrenome = val.sobrenome;
          this.usuario.aniversario = val.aniversario;
          this.usuario.email = val.email;
          this.usuario.senha = val.senha;
          this.usuario.mecanico = val.mecanico;
        }
        
        if(this.usuario.mecanico == "1"){
          this.img = "../../assets/imgs/icons/mechanic.png";
        }else{
          this.img = "../../assets/imgs/icons/man.png";
        }

        this.buscarVeiculo();
      });
      
    // this.emailUsuario = navParams.get('emailUsuario');
    this.veiculo = new Veiculo();

    this.loading = this.loadingController.create({ content: "Carregando.." });
  }

  editarUsuario(){
    let logado = "Cliente";
    if(this.usuario.mecanico == "1")
      logado = "Mecanico";

    this.navCtrl.push(CadastroUsuarioPage, {
      logado: logado,
      usuarioAtualizar : this.usuario
    });
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
          else{
            var veiculo = JSON.parse(result.veiculo[0]);

            this.veiculo.id = veiculo.id;
            this.veiculo.modelo = veiculo.modelo;
            this.veiculo.marca = veiculo.marca;
            this.veiculo.placa = veiculo.placa;
            this.veiculo.kmAtual = veiculo.kmAtual;
            this.veiculo.ultTrocaOleo = veiculo.ultTrocaOleo;
            this.veiculo.ultTrocaCorreia = veiculo.ultTrocaCorreia;

            // this.setStorage("VeiculoAtual", this.veiculo);
          }
        }
        else
        {
          this.toast.create({ message: result.msg , position: 'botton', duration: 3000 }).present();

          // let dados = this.getStorage("VeiculoAtual");
          // dados.then((val) => {
          //   console.log('Your age is', val);
          //   this.veiculo.id = val.id;
          //   this.veiculo.modelo = val.modelo;
          //   this.veiculo.marca = val.marca;
          //   this.veiculo.placa = val.placa;
          //   this.veiculo.kmAtual = val.kmAtual;
          //   this.veiculo.ultTrocaOleo = val.ultTrocaOleo;
          //   this.veiculo.ultTrocaCorreia = val.ultTrocaCorreia;
          // });
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

  OpenCadVeic(){
    this.navCtrl.push(CadastroVeiculoPage, {
      veiculo: this.veiculo,
      emailUsuario : this.emailUsuario
    });
  }

  chamaTela(tela: number, img: string){
    switch(tela) { 
      case 1: { 
        this.navCtrl.push(VerificaOleoPage,{ img: img });
         break; 
      } 
      case 2: { 
        this.navCtrl.push(VerificaAguaReservatorioPage,{ img: img });
         break; 
      } 
      case 3: { 
        this.navCtrl.push(VerificaAguaRadiadorPage,{ img: img });
         break; 
      } 
      case 4: { 
        this.navCtrl.push(VerificaGasolinaInjecaoPage,{ img: img });
         break; 
      } 
      default: { 

        let alert = this.alertCtrl.create({
          title: 'Opção Inválida',
          subTitle: 'A opção escolhida não existe.',
          buttons: ['Dismiss']
        });

        alert.present();
         break; 
      } 
   } 
  }
}
