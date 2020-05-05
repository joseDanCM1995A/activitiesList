import { ListaItem } from './lista-item.model';
export class Lista {
    id: number; // de la nueva lista
    titulo: string;
    creadaEn: Date; // cuando se crea
    terminadaEn: Date; // cuando se termina
    terminada: boolean; // bandera para saber el estado de la tarea
    items: ListaItem[]; // conjunto de items que perteneceran a la lista

    constructor(titulo: string) {
        this.titulo = titulo;
        this.creadaEn = new Date(); // se instancia la fecha
        this.terminada = false; // la tarea no está terminada cuando se crea
        this. items = []; // la lista está vacía cuando se crea
        this.id = new Date().getTime(); // se generara un id único cuando se instancié
     }
}
