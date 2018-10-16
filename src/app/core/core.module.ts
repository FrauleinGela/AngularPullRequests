import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './error/error.component';
import { ApiService, ErrorService, GithubService } from './services';
import {ErrorInterceptor} from './interceptors';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [CommonModule],
  declarations: [ErrorComponent],
  exports: [
    BrowserAnimationsModule,
    ErrorComponent
  ],
  providers: [
    GithubService,
    ApiService,
    ErrorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
      deps: [ErrorService]
    }
  ]
})

export class CoreModule { }
