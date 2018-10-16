import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ErrorService {
  private errorSource = new Subject();
  public $error = this.errorSource.asObservable();
  constructor() { }

  setError(error: any) {
    this.errorSource.next(error);
  }
}
