import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GithubService } from '../../../../core/services';
import { PullRequest } from '../../../../shared/models';

@Component({
  selector: 'app-pull-request-detail',
  templateUrl: './pull-request-detail.component.html',
  styleUrls: ['./pull-request-detail.component.scss']
})
export class PullRequestDetailComponent implements OnInit {
  loading = false;
  pullRequest$: Observable<PullRequest>;
  constructor(
    private githubService: GithubService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getInfo(id);
  }

  getInfo(id) {
    this.pullRequest$ = this.githubService.getPullRequest(id);
  }
}
