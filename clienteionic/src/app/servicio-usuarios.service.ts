import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioUsuariosService {

  constructor() { }

  muestraMejsaje(mensaje:String){
    alert(mensaje);

  }
}
