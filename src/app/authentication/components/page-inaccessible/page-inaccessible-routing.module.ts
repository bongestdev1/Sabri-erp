import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageInaccessibleComponent } from './page-inaccessible.component';


const routes: Routes = [{
  path:'',
  component:PageInaccessibleComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageInaccessibleRoutingModule { }
