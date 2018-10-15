import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService, GithubService } from './services';

@NgModule({
  imports: [],
  declarations: [],
  exports: [BrowserAnimationsModule],
  providers: [
    GithubService,
    ApiService
  ]
})

export class CoreModule { }
