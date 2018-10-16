import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubService } from '../../../../core/services';
import { Pagination, PullRequest, Repository } from '../../../../shared/models';
import { PaginationService } from '../../../../shared/services';

@Component({
  selector: 'app-repository-detail',
  templateUrl: './repository-detail.component.html',
  styleUrls: ['./repository-detail.component.scss']
})
export class RepositoryDetailComponent implements OnInit {
  loading = false;
  loadingPullRequests = false;
  repositoryInfo: Repository;
  pagination: Pagination = {
    per_page: 10,
    page: 1,
    pageSizeOptions: [10]
  };
  pullRequestsLength = 0;
  pullRequestsPage: PullRequest[];
  constructor(
    private githubService: GithubService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private paginationService: PaginationService
  ) { }

  ngOnInit() {
    this.getRepositoryData();
    this.paginationService.pagination = this.pagination;
    this.paginationService.$changePage.subscribe((page) => {
      this.updateRoutes(page);
    });
    this.activatedRoute.queryParams.subscribe(params => {
      // if pagination.page is updated, get the new page(pull requests api)
      if (params.page && params.page !== '') {
        this.paginationService.pagination.page = Number(params.page);
      }
      this.getPullRequestPage();
    });
  }

  getRepositoryData() {
    this.loading = true;
    this.githubService.getInfo().subscribe((resp) => {
      this.repositoryInfo = resp;
      this.loading = false;
    }, () => this.loading = false);
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
    this.getPullRequests().subscribe((resp) => {
      this.setPullRequestsPage(resp);
      this.loadingPullRequests = false;
    }, () => this.loadingPullRequests = false);
  }

  updateRoutes(page) {
    // index number starts from 0
    this.router.navigate(['angular'], { queryParams: { page: page + 1 } });
  }

}
