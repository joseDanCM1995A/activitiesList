// se crea este modulo para que se pueda ocupar como filtro en tab1 y tab2
import { NgModule } from '@angular/core';
import { FiltroCompletadoPipe } from './filtro-completado.pipe';




@NgModule({
  declarations: [FiltroCompletadoPipe], // importando el filtro component
  exports: [FiltroCompletadoPipe], // permitiendo que se pueda usar en otros modulos externos a este
  // imports: [
  //   CommonModule omitimos est porque no vamos a trabajar con directivas
  // ]
})
export class PipesModule { }
