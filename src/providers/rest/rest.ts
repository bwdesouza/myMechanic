import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Veiculo } from '../../views/veiculo';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  // API_URL = 'http://ec2-18-217-226-27.us-east-2.compute.amazonaws.com/www/';
  API_URL = 'http://localhost:1234/';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  cadastrarVeiculo(veiculo: Veiculo): Observable<any> {

    var data = {
      modelo: veiculo.modelo,
      marca: veiculo.marca,
      placa: veiculo.placa,
      kmAtual: veiculo.kmAtual,
      ultTrocaOleo: veiculo.ultTrocaOleo,
      ultTrocaCorreia: veiculo.ultTrocaCorreia
    };
    
      
    let body = JSON.stringify(data);           

    return this.http
    .post(this.API_URL + 'cadVeiculo.php', body)
    .map(rest => { return rest })
    .catch(this.handleError);
  }

  private handleError(error: Response) {
    debugger
      console.error(error);
      return Observable.throw(error || 'Server Error');
  }

}
