import { Component } from '@angular/core';
import { CadastroVeiculoPage } from '../cadastro-veiculo/cadastro-veiculo';
import { NavController, AlertController } from 'ionic-angular';
import { Veiculo } from '../../views/veiculo';
import { VerificaOleoPage } from '../verifica-oleo/verifica-oleo';
import { VerificaAguaReservatorioPage } from '../verifica-agua-reservatorio/verifica-agua-reservatorio';
import { VerificaAguaRadiadorPage } from '../verifica-agua-radiador/verifica-agua-radiador';
import { VerificaGasolinaInjecaoPage } from '../verifica-gasolina-injecao/verifica-gasolina-injecao';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

veiculo: Veiculo;


cadastroVeiculoPage = CadastroVeiculoPage;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {

    this.veiculo = new Veiculo();

    this.veiculo.modelo = "Celta Life";
    this.veiculo.marca = "Chevrolet";
    this.veiculo.placa = "AQD-8705";
    this.veiculo.kmAtual = 103590;
    this.veiculo.ultTrocaOleo = 101150;
    this.veiculo.ultTrocaCorreia = 95050;
  }

  OpenCadVeic(){
    this.navCtrl.push(CadastroVeiculoPage, {
      veiculo: this.veiculo
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
