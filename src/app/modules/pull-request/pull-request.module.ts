import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PullRequestDetailComponent } from './pages/pull-request-detail/pull-request-detail.component';
import { PullRequestRoutingModule } from './pull-request-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PullRequestRoutingModule,
    SharedModule
  ],
  declarations: [PullRequestDetailComponent]
})
export class PullRequestModule { }
