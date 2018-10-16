import { Component, Input } from '@angular/core';
import { PaginationService } from '../../../shared/services';
import { Pagination } from '../../models';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() pagination: Pagination;
  @Input() lengthItems: number;

  constructor(private paginationService: PaginationService) { }

  changePage({ pageIndex }) {
    this.paginationService.setPage(pageIndex);
  }
}
