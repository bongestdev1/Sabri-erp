import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './components/login/login.component';
import { MotPasseOublierComponent } from './components/mot-passe-oublier/mot-passe-oublier.component';
import { RenisialiserMotPasseComponent } from './components/renisialiser-mot-passe/renisialiser-mot-passe.component';
import { LoadingComponent } from './components/loading/loading.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PageInaccessibleComponent } from './components/page-inaccessible/page-inaccessible.component';
import { SharedGlobalModule } from '../shared-global/shared-global.module';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';

@NgModule({
  declarations: [AuthenticationComponent, LoginComponent, MotPasseOublierComponent, RenisialiserMotPasseComponent, LoadingComponent, PageInaccessibleComponent, LoginAdminComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule, ReactiveFormsModule,
    SharedGlobalModule,
  ]
})
export class AuthenticationModule { }
