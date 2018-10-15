import { PullRequest, Repository } from '../../../shared/models';

export const repositoryInfo = {
  name: 'github title',
  description: 'github description'
};

export const pullRequestsData = {
  paginationResp: {
    last: '34'
  },
  pullRequests: [
    new PullRequest(
      1234,
      'open',
      'open request test',
      'body pull request',
      '2018-10-10T20:56:18Z'
    ),
    new PullRequest(
      4321,
      'open',
      'open request test',
      'body pull request',
      '2018-10-10T20:56:18Z'
    )
  ]
};
