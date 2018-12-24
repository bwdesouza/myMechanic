import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeusServicosPage } from './meus-servicos';

@NgModule({
  declarations: [
    MeusServicosPage,
  ],
  imports: [
    IonicPageModule.forChild(MeusServicosPage),
  ],
})
export class MeusServicosPageModule {}
