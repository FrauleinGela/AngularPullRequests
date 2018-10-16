import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { GithubService } from 'src/app/core';
import { pullRequestsData } from '../../../../core/mocks';
import { SharedModule } from '../../../../shared/shared.module';
import { PullRequestDetailComponent } from './pull-request-detail.component';
import { DebugElement } from '@angular/core';

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
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display pullRequest', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const bannerEl: HTMLElement = bannerDe.nativeElement;
    const appLoaderDom = bannerEl.querySelector('.pullRequest__item');
    expect(appLoaderDom.textContent).toContain('open request test');
  });

});
