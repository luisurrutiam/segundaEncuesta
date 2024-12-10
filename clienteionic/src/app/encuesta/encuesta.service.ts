import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private apiUrl = 'http://localhost/api/encuestas'; // Ajusta la URL a tu entorno

  constructor(private http: HttpClient) {}

  createEncuesta(encuesta: any): Observable<any> {
    return this.http.post(this.apiUrl, encuesta);
  }
}
