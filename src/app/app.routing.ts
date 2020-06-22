import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { UsersComponent } from './views/pages/users/users.component';
import { DevicesComponent } from './views/pages/devices/devices.component';
import { ReportsComponent } from './views/pages/reports/reports.component';
import { UserFormComponent } from './views/pages/users/user-form/user-form.component';
import { DeviceFormComponent } from './views/pages/devices/device-form/device-form.component';
import { AuthGuardService } from './auth.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404',
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page',
    },
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'devices',
        component: DevicesComponent,
        data: {
          title: 'Devices',
        },
      },
      {
        path: 'reports',
        component: ReportsComponent,
        data: {
          title: 'Reports',
        },
      },
      {
        path: 'user-form',
        component: UserFormComponent,
        data: {
          title: 'Form',
        },
      },
      {
        path: 'device-form',
        component: DeviceFormComponent,
        data: {
          title: 'Form',
        },
      },
      {
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'Users',
        },
        children: [
          {
            path: 'user-form',
            component: UserFormComponent,
            data: {
              title: 'Form',
            },
          },
        ],
      },
    ],
  },
  { path: '**', component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
