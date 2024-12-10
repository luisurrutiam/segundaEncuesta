import { Component, OnInit } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IonicModule } from '@ionic/angular'; // Importar IonicModule
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-respuestaencuesta',
  templateUrl: './respuestaencuesta.page.html',
  styleUrls: ['./respuestaencuesta.page.scss'],
  standalone: true,
  imports: [
    IonicModule, // Asegúrate de importar IonicModule
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
  ]
})
export class RespuestaEncuestaPage implements OnInit {
  encuesta: any = null;
  formData: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const encuestaId = this.route.snapshot.paramMap.get('id');
    if (encuestaId) {
      this.cargarEncuesta(encuestaId);
    } else {
      console.error('No se encontró el ID de la encuesta');
    }
  }

  async cargarEncuesta(encuestaId: string) {
    const options = {
      url: `${environment.apiUrl}encuestas/${encuestaId}`,
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const response: HttpResponse = await CapacitorHttp.get(options);
      if (response.status === 200) {
        this.encuesta = response.data;
        this.inicializarFormData();
      }
    } catch (error: any) {
      console.error('Error:', error);
    }
  }

  inicializarFormData() {
    this.encuesta.preguntas.forEach((pregunta: any) => {
      this.formData[`question_${pregunta.id}`] = '';
    });
    this.formData.encuesta_id = this.encuesta.id;
  }

  async submitForm() {
    // Asegurarse de que todas las respuestas sean cadenas de texto
    Object.keys(this.formData).forEach(key => {
      this.formData[key] = String(this.formData[key]);
    });

    const options = {
      url: `${environment.apiUrl}guardar-respuestas`,
      headers: { 'Content-Type': 'application/json' },
      data: this.formData,
    };

    try {
      const response: HttpResponse = await CapacitorHttp.post(options);
      if (response.status === 201) {
        console.log('Success:', response);
      }
    } catch (error: any) {
      console.error('Error:', error);
    }
  }
}