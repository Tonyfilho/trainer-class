import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: '', redirectTo: 'class', pathMatch: 'full' }, // Rota padrão
    { path: 'class', loadComponent:()  => import('./pages/home/home.component').then(c => c.HomeComponent)},

    // Adicione outras rotas aqui
  ];