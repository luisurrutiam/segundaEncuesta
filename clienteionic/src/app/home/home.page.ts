import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule, // Asegúrate de importar IonicModule
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    RouterModule 
  ]
})
export class HomePage implements OnInit {
  encuestas: any[] = [];
  apiErrors: any = null;

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {
    this.obtenerEncuestas();
  }

  async obtenerEncuestas() {
    const options = {
      url: `${environment.apiUrl}encuestas`,
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const response: HttpResponse = await CapacitorHttp.get(options);
      if (response.status === 200) {
        this.encuestas = response.data;
      }
    } catch (error: any) {
      console.error('Error al obtener las encuestas:', error);
      this.apiErrors = error;
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Hubo un error al obtener las encuestas.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}