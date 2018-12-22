import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CadastroVeiculoPage } from '../pages/cadastro-veiculo/cadastro-veiculo';
import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';
import { Usuario } from '../views/usuario';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { MeusVeiculosPage } from '../pages/meus-veiculos/meus-veiculos';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = LoginPage;
  pages: Array<{title: string, component: any}>;
  usuario : Usuario = new Usuario();

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storage: Storage
  ) {
    this.initializeApp();

    // let dados = this.getStorage("UsuarioLogado");
    // dados.then((val) => {
    //   console.log('Your age is', val);
    //   if(val != null && val != undefined){
    //     this.usuario.id = val.id;
    //     this.usuario.nome = val.nome;
    //     this.usuario.sobrenome = val.sobrenome;
    //     this.usuario.aniversario = val.aniversario;
    //     this.usuario.email = val.email;
    //     this.usuario.senha = val.senha;
    //     this.usuario.mecanico = val.mecanico;
    //   }

    //   if(this.usuario.mecanico == "0" && this.usuario.mecanico == undefined)
    //   {
    //     // set our app's pages
    //     this.pages = [
    //       { title: 'Cadastrar Veículo Novo', component: CadastroVeiculoPage },
    //       { title: 'Sair', component: LoginPage }
    //     ];
    //   }
    //   else{
    //     // set our app's pages
    //     this.pages = [
    //       { title: 'Cadastrar Cliente', component: CadastroUsuarioPage },      
    //       { title: 'Cadastrar Veículo Novo', component: CadastroVeiculoPage },
    //       { title: 'Sair', component: LoginPage }
    //     ];
    //   }
    // });

    
      // set our app's pages
      this.pages = [ 
        { title: 'Home', component: HelloIonicPage },
        { title: 'Meus Veículos', component: MeusVeiculosPage },
        { title: 'Sair', component: LoginPage }
      ];
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
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
}
