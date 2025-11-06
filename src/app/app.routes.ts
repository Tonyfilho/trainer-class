import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: '', redirectTo: 'wellcome', pathMatch: 'full' }, // Rota padrão
    { path: 'wellcome', loadComponent:()  => import('./pages/_wellcome/wellcome.component').then(c => c.WellcomeComponent)},
    { path: 'class/angular-install', loadComponent:()  => import('./pages/get-starting-angular/get-starting-with-angular.component').then(c => c.GetStartingWithAngularComponent)},
    { path: 'class/git-install', loadComponent:()  => import('./pages/git/git.component').then(c => c.GitComponent)},

    // Adicione outras rotas aqui
  ];
