import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { OAuthService, OAuthSuccessEvent } from 'angular-oauth2-oidc';

import { RuntimeConfigurationService, RuntimeConfigurationServiceMock } from 'chase-services';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatMenuModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: RuntimeConfigurationService,
          useClass: RuntimeConfigurationServiceMock
        },
        {
          provide: OAuthService,
          useValue: {
            loadDiscoveryDocument: () => new Promise<OAuthSuccessEvent>((resolve, reject) => {
}),
            tryLogin: () => {},
            hasValidAccessToken: () =>  true,
            silentRefresh: () => {},
            getIdentityClaims: () => 'user_name',
            setupAutomaticSilentRefresh: () => 'user_name',
            initImplicitFlow: () => 'user_name',
            logOut: () => 'user_name',
          }
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'odyquest-cms'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('odyquest-cms');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('odyquest-cms app is running!');
  // });
});
