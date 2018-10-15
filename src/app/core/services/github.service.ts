import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pagination, PullRequest } from '../../shared/models';
import { ApiService } from './api.service';
const parse = require('parse-link-header');

@Injectable()
export class GithubService {
  constructor(private apiService: ApiService) { }

  getInfo(): Observable<any> {
    return this.apiService.get('repos/angular/angular');
  }

  getPullRequestsData(pagination: Pagination): Observable<any> {
    const { per_page, page } = pagination;
    return this.apiService.getFullResponse(
      'repos/angular/angular/pulls',
      {
        'per_page': per_page,
        'page': page,
      }
    ).pipe(map((resp) => {
      const paginationResp = parse(resp.headers.get('link'));
      const pullRequests = resp.body;
      return { paginationResp, pullRequests };
    }));
  }

  getPullRequest(id: number): Observable<PullRequest> {
    return this.apiService.get(`repos/angular/angular/pulls/${id}`).pipe(map((resp) => {
      return this.createPullRequest(resp);
    }));
  }

  createPullRequest({ number, state, title, body, created_at }) {
    return new PullRequest(
      number,
      state,
      title,
      body,
      created_at);
  }
}
