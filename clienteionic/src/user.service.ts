import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: any; // Aquí se almacenará la información del usuario

  constructor() {}

  setUser(user: any) {
    this.user = user; // Guarda la información del usuario
  }

  getUser() {
    return this.user; // Obtén la información del usuario
  }

  clearUser() {
    this.user = null; // Limpia la información del usuario (útil para logout)
  }
}
