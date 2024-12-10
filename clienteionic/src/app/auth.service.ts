import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private isDeveloper = false;
  private currentUser: any = null; // Variable para almacenar los datos del usuario
  private apiUrl = environment.apiUrl; // Usa la URL de tu API desde environment

  constructor(private router: Router) {}

  async login(email: string, password: string, isDeveloper: boolean): Promise<boolean> {
    const options = {
      url: `${this.apiUrl}login`,
      headers: { 'Content-Type': 'application/json' },
      data: { email, password },
    };
  
    try {
      const response: HttpResponse = await CapacitorHttp.post(options);
      if (response.status === 200 && response.data.token) {
        this.isAuthenticated = true;
        this.isDeveloper = isDeveloper;
  
        // Almacena los datos del usuario, incluyendo el rol basado en el checkbox
        this.currentUser = { 
          email: email,
          token: response.data.token, 
          name: response.data.name || 'Usuario',
          role: isDeveloper ? 'Desarrollador' : 'Usuario', // Aquí asignamos el rol según el checkbox
        };
  
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser)); // Guarda en localStorage
  
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      return false;
    }
  }
  

  logout() {
    this.isAuthenticated = false;
    this.currentUser = null;
    localStorage.removeItem('currentUser'); // Limpia el almacenamiento
    this.router.navigate(['login']);
  }

  getAuthStatus() {
    return this.isAuthenticated;
  }

  getDeveloperStatus() {
    return this.isDeveloper;
  }

  getCurrentUser() {
    // Recupera los datos del usuario, ya sea de memoria o localStorage
    if (!this.currentUser) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    }
    return this.currentUser;
  }
}
