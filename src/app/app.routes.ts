import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', loadComponent: () => import('./app.component').then(m => m.AppComponent) },
  { path: '**', redirectTo: '/employees' }
];
