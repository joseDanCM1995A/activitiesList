import { Component, OnInit, Input } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from '../../models/lista-item.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  @Input() ultimo: number;

  lista: Lista; // de tipo lista
  nombreItem = ''; // el valor del ngmodel del valor del imput
  // tslint:disable-next-line: max-line-length
  constructor(private deseosService: DeseosService, private route: ActivatedRoute, private alert: AlertController) { // importanto el servicio y una ruta para cachar id desde url 
    const listaId = this.route.snapshot.paramMap.get('listaId'); // recuperando valor del id desde url
    // tslint:disable-next-line: max-line-length
    this.lista = this.deseosService.obtenerLista( listaId ); // asignand a la variable ista el valor de la lista que se va a obtener con toda la info de esta misma
    console.log(this.lista);
  }

  ngOnInit() {
  }

  agregarItem() {
    if (this.nombreItem.length === 0) { // validando que el campo no esté vacío
      return;
    }
    const nuevoItem = new ListaItem(this.nombreItem); // declarando un nuevo item que será agregado a ala lista
    this.lista.items.push(nuevoItem); // aregando a la lista de items el nuevo item

    this.nombreItem = ''; // reseteando el valor para el próximo item
    this.deseosService.guardarStorage(); // hacer persistente la información del item
  }

  async estadoCheck(item: ListaItem) { // recibiendo un item
    console.log(item); // checando el estado del item
    // tslint:disable-next-line: max-line-length
    const pendientes = this.lista.items.filter(itemData => !itemData.completado).length; // filter es para regresa un conjunto de elementos que cunpen una condición, en este caso los que no han sido completados y checar cuantos faltan por completar
    if (pendientes === 0) {
      this.lista.terminadaEn = new Date(); // cuando se terminen los pendientes se da una fecha de termino
      this.lista.terminada = true; // si se terminan los pendientes, la lista se completa
    } else {
      this.lista.terminadaEn = null; // en caso de que se deseleccione una tarea terminada
      this.lista.terminada = false;
    }
    // guardando en el storage
    this.deseosService.guardarStorage();
  }

  borrarItem(index: number) {
    // tslint:disable-next-line: max-line-length
    this.lista.items.splice(index, 1); // con el método splice se borra del arreglo un elemento, pasandole el indice y la cantidad de elementos a borrar
    this.deseosService.guardarStorage(); // hacer persistente la información
  }

}
