import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'default',
        loadChildren: () => import('./dash-default/dash-default.module').then(module => module.DashDefaultModule)
      },
      {
        path: 'achats',
        loadChildren: () => import('./dash-achats/dash-achats.module').then(module => module.DashAchatstModule)
      },
      {
        path: 'stocks',
        loadChildren: () => import('./dash-stocks/dash-stocks.module').then(module => module.DashStocksModule)
      },
      {
        path: 'ventes',
        loadChildren: () => import('./dash-ventes/dash-ventes.module').then(module => module.DashVentesModule)
      },
      {
        path: 'gmo',
        loadChildren: () => import('./dash-gmo/dash-gmo.module').then(module => module.DashGmoModule)
      },
      {
        path: 'finance',
        loadChildren: () => import('./dash-finance/dash-finance.module').then(module => module.DashFinanceModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
