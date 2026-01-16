import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' }, // Rota padrão
  {
    path: 'welcome',
    loadComponent: () =>
      import('./pages/_wellcome/wellcome.component').then((c) => c.WellcomeComponent),
  },
  {
    path: 'uc-ufcd5409',
    loadComponent: () => import('./pages/_uc/uc').then((c) => c.Uc),
  },
  /**Aulas Roters */
  {
    path: 'class/aula01',
    loadComponent: () => import('./pages/aulas/aula01/aula01').then((c) => c.Aula01),
  },
  {
    path: 'class/aula02',
    loadComponent: () => import('./pages/aulas/aula02/aula02').then((c) => c.Aula02),
  },
  {
    path: 'class/aula03',
    loadComponent: () => import('./pages/aulas/aula03/aula03').then((c) => c.Aula03),
  },
  {
    path: 'class/aula04',
    loadComponent: () => import('./pages/aulas/aula04/aula04').then((c) => c.Aula04),
  },
  {
    path: 'class/aula05',
    loadComponent: () => import('./pages/aulas/aula05/aula05').then((c) => c.Aula05),
  },


  /**Exercicios Routers */
  {
    path: 'class/trabalho-pratico-do-curso',
    loadComponent: () => import('./pages/exercicios/exercicio-01/exercicio-01').then((c) => c.Exercicio01),
  },


  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found').then((c) => c.NotFound),
  },
  // Adicione outras rotas aqui
];
