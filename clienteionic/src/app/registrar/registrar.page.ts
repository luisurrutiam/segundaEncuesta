import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonInput, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonFooter, IonItem, IonButton, IonLabel, IonText, IonInputPasswordToggle, IonMenuButton } from '@ionic/angular/standalone';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { RouterLink, RouterLinkActive } from '@angular/router';



@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
  standalone: true,
  imports: [
    RouterLink, 
    RouterLinkActive,IonText, IonFooter, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonButtons, IonLabel, IonItem, 
    IonInput, IonButton, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, 
    ReactiveFormsModule, IonInputPasswordToggle, IonMenuButton
  ]
})
export class RegistrarPage implements OnInit {

  private environment = environment;
  usuarioForm: FormGroup;
  apiErrors: any = null;

  constructor(private formBuilder: FormBuilder) {
    this.usuarioForm = this.formBuilder.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      estado: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    // Aquí se pueden configurar otras inicializaciones si las necesitas
    console.log("Formulario inicializado:", this.usuarioForm);
  }

  async onSubmit(): Promise<void> {
    if (this.usuarioForm.valid) {
      const formData = this.usuarioForm.value;

      const options = {
        url: this.environment.apiUrl + 'create',
        headers: { 'Content-Type': 'application/json' },
        data: formData,
      };

      try {
        const response: HttpResponse = await CapacitorHttp.post(options);
        if (response.status === 200) {
          console.log('Usuario registrado con éxito:', response.data);
          alert('Usuario registrado exitosamente');
          this.usuarioForm.reset(); // Reiniciar el formulario después de enviar
          this.apiErrors = null; // Limpiar errores
        }
      } catch (error: any) {
        if (error.status === 400) {
          console.error('Errores de validación:', error.data.errors);
          this.apiErrors = error.data.errors; // Mostrar errores de la API
        } else {
          console.error('Error en la solicitud:', error);
          alert('Ocurrió un error al registrar el usuario. Intente nuevamente.');
        }
      }
    } else {
      console.log('Formulario inválido:', this.usuarioForm.value);
      alert('Por favor complete todos los campos correctamente.');
    }
  }
}
