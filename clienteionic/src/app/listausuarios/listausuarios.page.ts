import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonList, IonAvatar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonButtons, IonMenuButton, IonItemOptions, IonItemOption, IonItemSliding, IonModal } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-listausuarios',
  templateUrl: './listausuarios.page.html',
  styleUrls: ['./listausuarios.page.scss'],
  standalone: true,
  imports: [IonModal, IonItemSliding, IonItemOption, IonItemOptions, IonButtons, IonIcon, IonButton, IonMenuButton, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonAvatar, IonList, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ListausuariosPage implements OnInit {

  public user: any = [];

  public selectUser: any = {};

  private enviroment = environment;  
  
  constructor() { }

  async ngOnInit() {
    const options = {
      url: this.enviroment.apiUrl + 'users',
      headers: { 'Content-Type': 'application/json' }
    };
  
    const response: HttpResponse = await CapacitorHttp.get(options);
    this.user = response.data;
    this.selectUser = this.user;
  }

  onSelectUser(user: any){
    this.selectUser = user;
  }

  onDeleteUser(){
    this.selectUser = {};
  }

}
