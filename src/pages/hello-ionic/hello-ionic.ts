import { Component } from '@angular/core';
import { CadastroVeiculoPage } from '../cadastro-veiculo/cadastro-veiculo';
import { NavController } from 'ionic-angular';
import { Veiculo } from '../../views/veiculo';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

veiculo: Veiculo;


cadastroVeiculoPage = CadastroVeiculoPage;
  constructor(public navCtrl: NavController) {

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
}
