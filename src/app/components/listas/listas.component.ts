import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild( IonList , { static: false }) lista: IonList;
  @Input() seccionConcluida = true; // variable para saber en que sección está

  constructor(public deseosService: DeseosService, private router: Router, public alert: AlertController) { }

  ngOnInit() {}

  listaSeleccionada(lista: Lista) {
    if (this.seccionConcluida) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`); // redireccinar a tab2/agregar
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`); // redireccionar a tab1/agregar
    }
  }

  eliminarLista( lista: Lista ) {
      // llamando el método de borrar desde el servicio
      this.deseosService.borrarLista(lista);
  }

  async editarLista( lista: Lista ) {

    const alert = await this.alert.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: ( data ) => {
            console.log(data);
            if ( data.titulo.length === 0 ) {
              return;
            }

            lista.titulo = data.titulo;
            this.deseosService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();


  }
  }


