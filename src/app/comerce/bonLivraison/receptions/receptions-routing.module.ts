import { ModifierReceptionComponent } from './modifier-reception/modifier-reception.component';
import { ListReceptionComponent } from './list-reception/list-reception.component';
import { ReceptionsComponent } from './receptions.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ajout',
        component: ReceptionsComponent
      },
      {
        path: 'list',
        component: ListReceptionComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierReceptionComponent
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionsRoutingModule { }
