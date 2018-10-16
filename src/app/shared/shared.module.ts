import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './components/material/material.module';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PaginationService } from './services';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule
  ],
  declarations: [
    PaginationComponent,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    PaginationComponent
  ],
  providers: [PaginationService]
})

export class SharedModule { }
