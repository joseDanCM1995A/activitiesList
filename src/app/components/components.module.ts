import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListasComponent } from './listas/listas.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    ListasComponent // importando el componente de listas
  ],
  exports: [
    ListasComponent // exportando para uso externo en otros modulos
  ],
  imports: [
    CommonModule,
    IonicModule, // importando el modulo de ionic para que se reconozcan sus etiquetas
    PipesModule // importando el módulo de los pipes
  ]
})
export class ComponentsModule { }
