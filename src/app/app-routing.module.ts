import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },  {
    path: 'transfer',
    loadChildren: () => import('./transfer/transfer.module').then( m => m.TransferPageModule)
  },
  {
    path: 'configuracao',
    loadChildren: () => import('./configuracao/configuracao.module').then( m => m.ConfiguracaoPageModule)
  },
  {
    path: 'ajuda',
    loadChildren: () => import('./ajuda/ajuda.module').then( m => m.AjudaPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'esqueceusenha',
    loadChildren: () => import('./esqueceusenha/esqueceusenha.module').then( m => m.EsqueceusenhaPageModule)
  },
  {
    path: 'o-que-e',
    loadChildren: () => import('./o-que-e/o-que-e.module').then( m => m.OQueEPageModule)
  },
  {
    path: 'comofunciona',
    loadChildren: () => import('./comofunciona/comofunciona.module').then( m => m.ComofuncionaPageModule)
  },
  {
    path: 'metodo2fa',
    loadChildren: () => import('./metodo2fa/metodo2fa.module').then( m => m.Metodo2faPageModule)
  },
  {
    path: 'vantagem',
    loadChildren: () => import('./vantagem/vantagem.module').then( m => m.VantagemPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
