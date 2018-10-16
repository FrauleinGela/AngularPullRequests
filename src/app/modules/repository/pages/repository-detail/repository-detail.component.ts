import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GithubService } from '../../../../core/services';
import { Pagination, PullRequest, Repository } from '../../../../shared/models';
import { PaginationService } from '../../../../shared/services';

@Component({
  selector: 'app-repository-detail',
  templateUrl: './repository-detail.component.html',
  styleUrls: ['./repository-detail.component.scss']
})
export class RepositoryDetailComponent implements OnInit, OnDestroy {
  repositoryInfo$: Observable<Repository>;
  loading = false;
  loadingPullRequests = false;
  pagination: Pagination = {
    per_page: 10,
    page: 1,
    pageSizeOptions: [10]
  };
  pullRequestsLength = 0;
  pullRequestsPage: PullRequest[];
  destroySubject$: Subject<void> = new Subject();
  constructor(
    private githubService: GithubService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private paginationService: PaginationService
  ) { }

  ngOnInit() {
    this.getRepositoryData();
    this.paginationService.pagination = this.pagination;
    this.paginationService.$changePage.pipe(takeUntil(this.destroySubject$)).subscribe((page) => {
      this.updateRoutes(page);
    });
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroySubject$)).subscribe(params => {
      // if pagination.page is updated, get the new page(pull requests api)
      if (params.page && params.page !== '') {
        this.paginationService.pagination.page = Number(params.page);
      }
      this.getPullRequestPage();
    });
  }

  getRepositoryData() {
    this.repositoryInfo$ = this.githubService.getInfo();
  }

  getPullRequests() {
    this.loadingPullRequests = true;
    return this.githubService.getPullRequestsData(this.paginationService.pagination);
  }

  setPullRequestsPage(pullRequestsData) {
    this.pullRequestsPage = pullRequestsData.pullRequests;
    this.setPagination(pullRequestsData.paginationResp);
  }

  setPagination(paginationData) {
    const fullPagesItems = Number(paginationData.last.page) * Number(this.pagination.per_page);
    if (this.pullRequestsLength || this.pullRequestsLength !== fullPagesItems) {
      this.pullRequestsLength = fullPagesItems;
    }
  }

  getPullRequestPage() {
    this.getPullRequests().pipe(takeUntil(this.destroySubject$)).subscribe((resp) => {
      this.setPullRequestsPage(resp);
      this.loadingPullRequests = false;
    }, () => this.loadingPullRequests = false);
  }

  updateRoutes(page) {
    // index number starts from 0
    this.router.navigate(['angular'], { queryParams: { page: page + 1 } });
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }

}
