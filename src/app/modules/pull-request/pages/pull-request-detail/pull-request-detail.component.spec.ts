import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { GithubService } from 'src/app/core';
import { pullRequestsData } from '../../../../core/mocks';
import { SharedModule } from '../../../../shared/shared.module';
import { PullRequestDetailComponent } from './pull-request-detail.component';

describe('PullRequestDetailComponent', () => {
  let component: PullRequestDetailComponent;
  let fixture: ComponentFixture<PullRequestDetailComponent>;
  let pullRequestSpy;
  const pullRequestMockData = pullRequestsData.pullRequests[0];
  beforeEach(async(() => {
    const githubService = jasmine.createSpyObj('GithubService', ['getPullRequest']);
    pullRequestSpy = githubService.getPullRequest.and.returnValue(of(pullRequestMockData));
    TestBed.configureTestingModule({
      declarations: [PullRequestDetailComponent],
      providers: [
        { provide: GithubService, useValue: githubService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => {
                  return 123;
                }
              }
            }
          }
        }
      ],
      imports: [SharedModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PullRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return pullRequest', () => {
    component.ngOnInit();
    expect(component.pullRequest).toEqual(pullRequestMockData);
  });

});
