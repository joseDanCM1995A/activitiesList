import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filtroCompletado',
  pure: false // volviendo un pipe impuro para que suceda la detección de cambios y os cache no importa donde esté
})
export class FiltroCompletadoPipe implements PipeTransform {

  // recibe como parámetros una lista de tipo lista
  // un booleano para controlar los pendientes o cuncluídos
  // la variable boolena se iniciará en verdadero; saber si están completadas
  // este pipe regresará un conjunto de listas
  transform(listas: Lista[], concluida: boolean = true): Lista[] {
    // haciendo el filtro para que regresen las respectivas listas en etado pendiente o concluídas
    return listas.filter( lista => lista.terminada === concluida); // retornar las listas con estado termiada==true
  }

}
