import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
  ]
})
export class PerfilPage implements OnInit {
  currentUser: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser(); // Obtén los datos del usuario
    // Asegúrate de que el rol esté asignado correctamente
    if (this.currentUser) {
      this.currentUser.role = this.currentUser.isDeveloper ? 'Desarrollador' : 'Usuario';
    }
  }
}
