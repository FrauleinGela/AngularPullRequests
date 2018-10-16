import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../../../../core/services';
import { PullRequest } from '../../../../shared/models';

@Component({
  selector: 'app-pull-request-detail',
  templateUrl: './pull-request-detail.component.html',
  styleUrls: ['./pull-request-detail.component.scss']
})
export class PullRequestDetailComponent implements OnInit {
  loading = false;
  pullRequest: PullRequest;
  constructor(
    private githubService: GithubService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getInfo(id);
  }

  getInfo(id) {
    this.loading = true;
    this.githubService.getPullRequest(id).subscribe((resp) => {
      this.pullRequest = resp;
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }
}
