import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonList, IonItem, IonCardContent, IonButton, IonIcon, IonItemSliding, IonAvatar, IonLabel, IonItemOptions, IonItemOption } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.page.html',
  styleUrls: ['./institucion.page.scss'],
  standalone: true,
  imports: [IonItemOption, IonItemOptions, IonLabel, IonAvatar, IonItemSliding, IonIcon, IonButton, IonCardContent, IonItem, IonList, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton]
})
export class InstitucionPage implements OnInit {

  public institucion: any = [];

  public selectInstitucion: any = {};

  private enviroment = environment;  

  constructor() { }

 async ngOnInit() {
  const options = {
    url: this.enviroment.apiUrl + 'institucions',
    headers: { 'Content-Type': 'application/json' }
  };

    const response: HttpResponse = await CapacitorHttp.get(options);
    this.institucion = response.data;
    this.selectInstitucion = this.institucion;
  }

  onSelectUser(institucion: any){
    this.selectInstitucion = institucion;
  }

  onDeleteUser(){
    this.selectInstitucion = {};
  }

}
