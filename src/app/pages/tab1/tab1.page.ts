import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  constructor( public deseosService: DeseosService, private router: Router, private alert: AlertController) { // se inyecta el servicio

  }

  async agregarLista() { // con async se vuelve una promesa culaquier fnción
    // this.router.navigateByUrl('/tabs/tab1/agregar'); // para que cuando se presione el botón vaya a la ruta de agregar
    const alert = await this.alert.create({
      header: 'Nuevo lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
    ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data) => {
            console.log(data);
            if (data.titulo.length === 0) {
                return; // no hacer nada en dado caso de que el campo del nombre de la nueva lista esté vacío
            }

            // creación de la lista
            const listaId = this.deseosService.nuevaLista(data.titulo);
            this.router.navigateByUrl(`/tabs/tab1/agregar/${ listaId }`); // para que cuando se presione el botón vaya a la ruta de agregar

          }
        }
      ]
    });

    await alert.present();
  }
}
