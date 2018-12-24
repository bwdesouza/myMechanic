import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Veiculo } from '../../views/veiculo';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Usuario } from '../../views/usuario';
import { Servico } from '../../views/servico';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  API_URL = 'http://ec2-3-16-241-247.us-east-2.compute.amazonaws.com/';


  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  //Usuário
  loginUsuario(login: string, senha: string): Observable<any> {
    var data = {
      email: login,
      senha: senha
    };

    let body = JSON.stringify(data);

    return this.http
      .post(this.API_URL + 'login.php', body)
      .map(rest => { return rest })
  }

  cadastrarUsuario(usuario: Usuario): Observable<any> {

    var data = {
      id: usuario.id,
      nome: usuario.nome,
      sobrenome: usuario.sobrenome,
      aniversario: usuario.aniversario,
      email: usuario.email,
      senha: usuario.senha,
      mecanico: usuario.mecanico
    };

    let body = JSON.stringify(data);

    return this.http
      .post(this.API_URL + 'cadUsuario.php', body)
      .map(rest => { return rest });
  }

  //Veículo
  cadastrarVeiculo(veiculo: Veiculo): Observable<any> {
    var data = {
      id: veiculo.id,
      apelido: veiculo.apelido,
      modelo: veiculo.modelo,
      marca: veiculo.marca,
      placa: veiculo.placa,
      kmAtual: veiculo.kmAtual,
      ultTrocaOleo: veiculo.ultTrocaOleo,
      ultTrocaCorreia: veiculo.ultTrocaCorreia,
      emailUsuario: veiculo.emailUsuario
    };

    let body = JSON.stringify(data);

    return this.http
      .post(this.API_URL + 'cadVeiculo.php', body)
      .map(rest => { return rest })
  }

  buscarVeiculo(login: string): Observable<any> {
    var data = {
      email: login
    };

    let body = JSON.stringify(data);

    return this.http
      .post(this.API_URL + 'buscarVeiculo.php', body)
      .map(rest => { return rest })
  }

  excluirVeiculo(id: number): Observable<any> {
    var data = {
      id: id
    };

    let body = JSON.stringify(data);

    return this.http
      .post(this.API_URL + 'excVeiculo.php', body)
      .map(rest => { return rest })
  }

  //Serviços
  cadastrarServico(servico: Servico): Observable<any> {
    var data = {
      id: servico.id,
      veiculo: servico.veiculo,
      data: servico.data,
      servico: servico.servico,
      mecanica: servico.mecanica,
      observacao: servico.observacao,
      emailUsuario: servico.emailUsuario,
      preco: servico.preco
    };

    let body = JSON.stringify(data);

    return this.http
      .post(this.API_URL + 'cadServico.php', body)
      .map(rest => { return rest })
  }

  buscarServico(email: string): Observable<any> {
    var data = {
      email: email
    };

    let body = JSON.stringify(data);

    return this.http
      .post(this.API_URL + 'buscarServico.php', body)
      .map(rest => { return rest })
  }

  excluirServico(id: number): Observable<any> {
    var data = {
      id: id
    };

    let body = JSON.stringify(data);

    return this.http
      .post(this.API_URL + 'excServico.php', body)
      .map(rest => { return rest })
  }

}
