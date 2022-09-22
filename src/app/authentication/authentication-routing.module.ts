import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login-admin',
        loadChildren: () => import('./components/login-admin/login-admin.module').then(module => module.LoginAdminModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./components/login/login.module').then(module => module.LoginModule)
      },
      {
        path: 'motPasseOublier',
        loadChildren: () => import('./components/mot-passe-oublier/mot-passe-oublier.module').then(module => module.MotPasseOublierModule)
      },
      {
        path: 'RenitialiserMotdePasseOublie/:id',
        loadChildren: () => import('./components/renisialiser-mot-passe/renisialiser-mot-passe.module').then(module => module.RenisialiserMotPasseModule)
      }
      ,
      {
        path: 'page-inaccessible',
        loadChildren: () => import('./components/page-inaccessible/page-inaccessible.module').then(module => module.PageInaccessibleModule)
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
