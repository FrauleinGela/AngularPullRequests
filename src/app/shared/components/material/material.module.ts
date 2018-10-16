import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDividerModule,
  MatPaginatorModule
} from '@angular/material';

const materialModules = [
  MatButtonModule,
  MatCheckboxModule,
  MatDividerModule,
  MatPaginatorModule
];

@NgModule({
  imports: [...materialModules],
  exports: [...materialModules]
})
export class MaterialModule { }
