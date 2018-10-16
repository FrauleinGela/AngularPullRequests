import { PullRequestModule } from './pull-request.module';

describe('PullRequestModule', () => {
  let pullRequestModule: PullRequestModule;

  beforeEach(() => {
    pullRequestModule = new PullRequestModule();
  });

  it('should create an instance', () => {
    expect(pullRequestModule).toBeTruthy();
  });
});
