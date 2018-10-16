import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PullRequestDetailComponent } from './pages/pull-request-detail/pull-request-detail.component';

const routes: Routes = [
  {
    path: ':id',
    component: PullRequestDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PullRequestRoutingModule { }
