import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = []; // declarando un arreglo de listas vacías
  
  constructor() {
    this.cargarStorage(); // aquí mando a cargar el storage ya que se llama una única vez en el programa
  }

  nuevaLista( titulo: string ) {
    const nuevaLista = new Lista(titulo); // instanciando la nueva lista
    this.listas.push(nuevaLista); // agragando la nueva lista
    this.guardarStorage(); // llamando el método cada que se agrega una nueva lista para almacenarlo en el storage
    return nuevaLista.id; // tenemos que mandar el id de la lista que se cree
  }

  borrarLista(lista: Lista) {
   // tslint:disable-next-line: max-line-length
   this.listas = this.listas.filter (listaData => listaData.id !== lista.id);  // regresando todas las listas diferentes al id que mandamos a eliminar
  // haciendo persistente la información
   this.guardarStorage();
  }

  // función para obtener la información de la lista
  obtenerLista(id: string | number) { // ya sea cadena o número
    id = Number(id); // validando que sea entero
    return this.listas.find(listaData => listaData.id === id); // buscando la lista por medio del id

  }
  // método para guardar la data en el Storage
  guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas)); // convertir las listas a un string, ya que el Storage solo permite strings
  }

  // método para cargar el storage

  cargarStorage() {
    if (localStorage.getItem('data')) {
      this.listas = JSON.parse( localStorage.getItem('data')); // pasando de un string a un array
    } else {
      this.listas = []; // mostrar nada si no hay nada
    }
  }
}
