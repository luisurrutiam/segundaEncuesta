import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonHeader, IonToolbar, IonTitle, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { NgModule } from '@angular/core';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, person, personAddOutline, personSharp, homeOutline, homeSharp, personAddSharp, bookOutline, bookSharp, helpCircleOutline, helpCircleSharp, schoolOutline, schoolSharp, peopleOutline, peopleSharp, people, chevronBack, chevronBackOutline, chevronBackSharp, logIn, logInOutline, logInSharp, logOut, logOutOutline, logOutSharp, idCard, idCardOutline, idCardSharp, starHalf, starHalfOutline, starHalfSharp, book, school, home } from 'ionicons/icons';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonButtons, IonTitle, IonToolbar, IonHeader, RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {

  public appPages = [
    { title: 'Encuestas', url: '/home', icon: 'home' },
    { title: 'Resultados', url: '/resultados', icon: 'star-half' },
    { title: 'Perfil', url: '/perfil', icon: 'id-card' },
    { title: 'Usuarios', url: '/listausuarios', icon: 'people', requiresDeveloper: true },
    { title: 'Registrar Usuario', url: '/registrarUsuario', icon: 'people', requiresDeveloper: true },
    { title: 'Crear Encuesta', url: '/encuesta', icon: 'book', requiresDeveloper: true },
    { title: 'Institucion', url: '/institucion', icon: 'school' },
  ];

  constructor(public authService: AuthService) {
    addIcons({ mailOutline, mailSharp, personAddSharp, home, idCard, book, school, person, people,  personAddOutline, personSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, schoolOutline, schoolSharp, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, homeOutline, homeSharp, bookOutline, helpCircleOutline, helpCircleSharp, bookSharp, peopleOutline, peopleSharp,  chevronBack, chevronBackOutline, chevronBackSharp, logIn, logInOutline, logInSharp, logOut, logOutOutline, logOutSharp,  idCardOutline, idCardSharp, starHalf, starHalfOutline, starHalfSharp });
  }
}