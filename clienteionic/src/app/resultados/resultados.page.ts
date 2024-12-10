import { Component, OnInit } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { IonicModule } from '@ionic/angular'; // Importar IonicModule
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
  standalone: true,
  imports: [
    IonicModule, // Asegúrate de importar IonicModule
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
  ]
})
export class ResultadosPage implements OnInit {
  encuestas: any[] = [];

  ngOnInit() {
    this.cargarEncuestas();
  }

  async cargarEncuestas() {
    const options = {
      url: `${environment.apiUrl}resultados`, // Asegúrate de que la URL sea correcta
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const response: HttpResponse = await CapacitorHttp.get(options);
      if (response.status === 200) {
        this.encuestas = response.data;
      }
    } catch (error: any) {
      console.error('Error:', error);
    }
  }
}