import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Adding lazy load modules and preloading
const routes: Routes = [
  {
    path: '',
    redirectTo: '/angular',
    pathMatch: 'full'
  },
  {
    path: 'angular',
    loadChildren: './modules/repository/repository.module#RepositoryModule'
  },
  {
    path: 'pullrequest',
    loadChildren: './modules/pull-request/pull-request.module#PullRequestModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
