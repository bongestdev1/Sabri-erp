import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientHtmlComponent } from './client-html.component';


const routes: Routes = [
  {
    path: '',
    component: ClientHtmlComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientHtmlRoutingModule { }
