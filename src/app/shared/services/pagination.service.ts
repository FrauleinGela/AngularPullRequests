import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Pagination } from '../models';

@Injectable()
export class PaginationService {
  private changePageSource = new Subject<number>();
  public $changePage = this.changePageSource.asObservable();
  private _pagination: Pagination;

  constructor() { }

  set pagination(pagination: Pagination) {
    this._pagination = pagination;
  }

  get pagination(): Pagination {
    return this._pagination;
  }

  setPage(number) {
    this.changePageSource.next(number);
  }
}
