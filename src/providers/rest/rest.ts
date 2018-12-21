import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Veiculo } from '../../views/veiculo';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Usuario } from '../../views/usuario';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  // API_URL = 'http://ec2-18-234-70-79.compute-1.amazonaws.com/www/';
  // API_URL = 'http://localhost:1234/';
  API_URL = 'http://ec2-3-16-241-247.us-east-2.compute.amazonaws.com/';
  

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  cadastrarVeiculo(veiculo: Veiculo): Observable<any> {
    var data = {
      id: veiculo.id,
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
    //.catch(this.handleError);
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
    // .catch(this.handleError);
  }

  buscarVeiculo(login: string): Observable<any> {
      var data = {
        email: login
      };       
        
      let body = JSON.stringify(data);           
  
      return this.http
      .post(this.API_URL + 'buscarVeiculo.php', body)
      .map(rest => { return rest })
      //.catch(this.handleError);
    }

  loginUsuario(login: string, senha: string): Observable<any> {
      var data = {
        email: login,
        senha: senha
      };       
        
      let body = JSON.stringify(data);           
  
      return this.http
      .post(this.API_URL + 'login.php', body)
      .map(rest => { return rest })
      //.catch(this.handleError);
    }

  // private handleError(error: Response) {
  //     console.error(error);
  //     return Observable.throw(error || 'Server Error');
  // }

}
