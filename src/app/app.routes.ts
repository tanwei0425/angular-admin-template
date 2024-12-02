import { Routes } from '@angular/router';
import AdminLayoutComponent from '@app/layouts/admin-layout/admin-layout.component'
import AuthLayoutComponent from '@app/layouts/auth-layout/auth-layout.component'
import LoginComponent from '@app/pages/login/login.component'
import { authGuard } from '@core/authentication/auth.guard';
import { authChildGuard } from '@core/authentication/auth-child.guard';
export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authChildGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/companyApply' },
      { path: 'home', loadChildren: () => import('./pages/home/home.routes').then(m => m.HOME_ROUTES) },
      { path: 'companyApply', loadChildren: () => import('./pages/companyApply/companyApply.routes').then(m => m.COMPANY_APPLY_ROUTES) },
      { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
      { path: 'monitor', loadChildren: () => import('./pages/monitor/monitor.routes').then(m => m.MONITOR_ROUTES) },
      { path: 'basicForm', loadChildren: () => import('./pages/basicForm/basicForm.routes').then(m => m.BASIC_FORM_ROUTES) },
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
    ],
  },
  { path: '**', redirectTo: '/companyApply' },
];
