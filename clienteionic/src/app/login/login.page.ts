import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonInput, IonItem, IonLabel, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonFooter, IonRouterLink, IonRouterOutlet, IonApp } from '@ionic/angular/standalone';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth.service'; // Importa el AuthService
import { Router } from '@angular/router'; // Importa Router
import { IonicModule } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ 
    RouterLink, 
    RouterLinkActive, 
    IonRouterLink, 
    IonRouterOutlet,
   IonicModule, // Asegúrate de importar IonicModule
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
  
  ]
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, private authService: AuthService, private router: Router) { // Inyecta el AuthService y Router

    this.formularioLogin = this.fb.group({
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'isDeveloper': new FormControl(false)
    });

  }

  ngOnInit() {
  }

  async ingresar() {
    if (this.formularioLogin?.valid) {
      const email = this.formularioLogin?.get('email')?.value;
      const password = this.formularioLogin?.get('password')?.value;
      const isDeveloper = this.formularioLogin?.get('isDeveloper')?.value;
  
      const loginSuccessful = await this.authService.login(email, password, isDeveloper);
  
      if (loginSuccessful) {
        this.router.navigate(['/home']); // Redirige a la página de inicio
      } else {
        console.log('Email o contraseña incorrectos');
      }
    }
  }
  
  
  
}