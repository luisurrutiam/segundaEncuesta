import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Asegúrate de importar la guardia desde la ubicación correcta

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full', // Asegura que esta redirección funcione correctamente
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [AuthGuard], // Protege esta ruta
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'encuesta',
    loadComponent: () =>
      import('./encuesta/encuesta.page').then((m) => m.EncuestaPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'registrarUsuario',
    loadComponent: () =>
      import('./registrar/registrar.page').then((m) => m.RegistrarPage),
  },
  {
    path: 'listausuarios',
    loadComponent: () =>
      import('./listausuarios/listausuarios.page').then(
        (m) => m.ListausuariosPage
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'institucion',
    loadComponent: () =>
      import('./institucion/institucion.page').then((m) => m.InstitucionPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'crearpregunta',
    loadComponent: () =>
      import('./crearpregunta/crearpregunta.page').then(
        (m) => m.CrearpreguntaPage
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'privilegios',
    loadComponent: () =>
      import('./privilegios/privilegios.page').then((m) => m.PrivilegiosPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'perfil',
    loadComponent: () =>
      import('./perfil/perfil.page').then((m) => m.PerfilPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'respuestaencuesta/:id', // Incluye el parámetro dinámico :id
    loadComponent: () =>
      import('./respuestaencuesta/respuestaencuesta.page').then(
        (m) => m.RespuestaEncuestaPage
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'resultados',
    loadComponent: () =>
      import('./resultados/resultados.page').then((m) => m.ResultadosPage),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}