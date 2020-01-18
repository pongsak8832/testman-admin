import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppService} from './service/auth/app.service';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {
    path: 'admin',
    component: HomeComponent,
    canActivate: [AppService],
    children: [
          // {
          //   path: 'test-manager',
          //   loadChildren: () => import('./home/test-manager/test-manager.module').then(
          //           m => m.TestManagerModule,
          //       ),
          //   canActivate: [AppService],

          // },
          {
            path: 'user',
            loadChildren: () => import('./home/users/users.module').then(
                    m => m.UsersModule,
                ),
            canActivate: [AppService],

          },
          {
            path: 'organization',
            loadChildren: () => import('./home/organization-manager/organization-manager.module').then(
                    m => m.OrganizationManagerModule,
                ),
            canActivate: [AppService],

          },
          {
            path: 'client',
            loadChildren: () => import('./home/client-manager/client-manager.module').then(
                    m => m.ClientManagerModule,
                ),
            canActivate: [AppService],

          },
          {
            path: 'test',
            loadChildren: () => import('./home/test-manager/test-manager.module').then(
                    m => m.TestManagerModule,
                ),
            canActivate: [AppService],

          },
          {path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {path: '**', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
}
