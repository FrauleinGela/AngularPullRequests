import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RepositoryDetailComponent } from './pages/repository-detail/repository-detail.component';
import { RepositoryRoutingModule } from './repository-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RepositoryRoutingModule,
    SharedModule
  ],
  declarations: [
    RepositoryDetailComponent
  ]
})
export class RepositoryModule { }
