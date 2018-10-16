import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoaderComponent } from './components/loader/loader.component';
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
    LoaderComponent
  ],
  exports: [
    CommonModule,
    MaterialModule,
    PaginationComponent,
    LoaderComponent
  ],
  providers: [PaginationService]
})

export class SharedModule { }
