import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CadastroUsuarioPage } from '../pages/cadastro-usuario/cadastro-usuario';
import { CadastroVeiculoPage } from '../pages/cadastro-veiculo/cadastro-veiculo';
import { LoginPage } from '../pages/login/login';

import { HttpClientModule } from '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';
import { VerificaAguaRadiadorPage } from '../pages/verifica-agua-radiador/verifica-agua-radiador';
import { VerificaAguaReservatorioPage } from '../pages/verifica-agua-reservatorio/verifica-agua-reservatorio';
import { VerificaGasolinaInjecaoPage } from '../pages/verifica-gasolina-injecao/verifica-gasolina-injecao';
import { VerificaOleoPage } from '../pages/verifica-oleo/verifica-oleo';
import { IonicStorageModule } from '@ionic/storage';
import { MeusVeiculosPage } from '../pages/meus-veiculos/meus-veiculos';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    CadastroUsuarioPage,
    CadastroVeiculoPage,
    LoginPage,
    VerificaAguaRadiadorPage,
    VerificaAguaReservatorioPage,
    VerificaGasolinaInjecaoPage,
    VerificaOleoPage,
    MeusVeiculosPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrMaskerModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    CadastroUsuarioPage,
    CadastroVeiculoPage,
    LoginPage,
    VerificaAguaRadiadorPage,
    VerificaAguaReservatorioPage,
    VerificaGasolinaInjecaoPage,
    VerificaOleoPage,
    MeusVeiculosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}
