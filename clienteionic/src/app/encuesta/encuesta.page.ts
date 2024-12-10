import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { IonicModule } from '@ionic/angular'; // Importar IonicModule
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.page.html',
  styleUrls: ['./encuesta.page.scss'],
  standalone: true,
  imports: [
    IonicModule, // Asegúrate de importar IonicModule
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
  ]
})
export class EncuestaPage {
  encuestaForm: FormGroup;
  apiErrors: any = null;

  constructor(
    private fb: FormBuilder,
    private alertCtrl: AlertController
  ) {
    this.encuestaForm = this.fb.group({
      nombre: ['', Validators.required],
      institucion_id: ['', Validators.required],
      preguntas: this.fb.array([]),
    });
  }

  get preguntas(): FormArray {
    return this.encuestaForm.get('preguntas') as FormArray;
  }

  agregarPregunta() {
    const preguntaForm = this.fb.group({
      enunciado: ['', Validators.required],
      tipopregunta: this.fb.group({
        nombre: ['', Validators.required],
        opcion: [false, Validators.required],
      }),
      opciones: this.fb.array([]),
    });
    this.preguntas.push(preguntaForm);
  }

  eliminarPregunta(index: number) {
    this.preguntas.removeAt(index);
  }

  getOpciones(index: number): FormArray {
    return this.preguntas.at(index).get('opciones') as FormArray;
  }

  agregarOpcion(preguntaIndex: number) {
    const opciones = this.getOpciones(preguntaIndex);
    opciones.push(this.fb.group({ nombre: ['', Validators.required] }));
  }

  eliminarOpcion(preguntaIndex: number, opcionIndex: number) {
    const opciones = this.getOpciones(preguntaIndex);
    opciones.removeAt(opcionIndex);
  }

  async guardarEncuesta() {
    if (this.encuestaForm.invalid) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Por favor complete todos los campos requeridos.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const formData = this.encuestaForm.value;
    const options = {
      url: `${environment.apiUrl}encuestas`,
      headers: { 'Content-Type': 'application/json' },
      data: formData,
    };

    try {
      const response: HttpResponse = await CapacitorHttp.post(options);
      if (response.status === 201) {
        const alert = await this.alertCtrl.create({
          header: 'Éxito',
          message: 'Encuesta guardada exitosamente.',
          buttons: ['OK'],
        });
        await alert.present();
        this.encuestaForm.reset();
        this.preguntas.clear();
        this.apiErrors = null; // Limpiar errores si los hay
      }
    } catch (error: any) {
      if (error.status === 400) {
        console.error('Errores de validación:', error.data.errors);
        this.apiErrors = error.data.errors; // Mostrar errores de la API
      } else {
        console.error('Error en la solicitud:', error);
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Hubo un error al guardar la encuesta.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }
}