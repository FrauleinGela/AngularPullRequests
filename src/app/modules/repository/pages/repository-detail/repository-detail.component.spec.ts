import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { pullRequestsData, repositoryInfo, routesData } from '../../../../core/mocks/';
import { GithubService } from '../../../../core/services';
import { PaginationService, SharedModule } from '../../../../shared';
import { RepositoryDetailComponent } from './repository-detail.component';

describe('RepositoryDetailComponent', () => {
  let component: RepositoryDetailComponent;
  let fixture: ComponentFixture<RepositoryDetailComponent>;
  let getInfoValueSpy;
  let getPullRequestsDataSpy;

  beforeEach(async(() => {
    const routes = routesData;
    const githubService = jasmine.createSpyObj('GithubService', ['getInfo', 'getPullRequestsData']);
    getInfoValueSpy = githubService.getInfo.and.returnValue(of(repositoryInfo));
    getPullRequestsDataSpy = githubService.getPullRequestsData.and.returnValue(of(pullRequestsData));
    TestBed.configureTestingModule({
      declarations: [RepositoryDetailComponent],
      providers: [
        { provide: GithubService, useValue: githubService }
      ],
      imports: [
        HttpClientTestingModule,
        SharedModule,
        RouterTestingModule.withRoutes(routes)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not app-loader component be visible', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const bannerEl: HTMLElement = bannerDe.nativeElement;
    const appLoaderDom = bannerEl.querySelectorAll('app-loader');
    expect(appLoaderDom.length).toBe(0);
  });

  it('should loadingPullRequests (subscribes) return false', () => {
    expect(component.loadingPullRequests).toBe(false);
  });

  it('should return repository info', () => {
    const bannerDe: DebugElement = fixture.debugElement;
    const bannerEl: HTMLElement = bannerDe.nativeElement;
    const appLoaderDom = bannerEl.querySelector('.repository-block__header');
    expect(appLoaderDom.textContent).toContain('github title');
  });

  it('should return pullRequests', () => {
    expect(component.pullRequestsPage.length).toEqual(pullRequestsData.pullRequests.length);
  });

  it('should change the PaginationService.pagination.page if $changePage is fired', fakeAsync(() => {
    const paginationService = TestBed.get(PaginationService);
    paginationService.changePageSource.next(3);
    fixture.detectChanges();
    tick();
    expect(paginationService.pagination.page).toBe(4);
  }));
});
