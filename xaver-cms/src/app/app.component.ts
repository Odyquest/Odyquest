import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { OktaAuthService } from '@okta/okta-angular';

// import { OAuthService } from 'angular-oauth2-oidc';
import { OAuthService, OAuthErrorEvent } from 'angular-oauth2-oidc'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuthenticated: boolean;
  title = 'xaver-cms';
  userName;



  username = '';

  get token() { return this.oauthService.getAccessToken(); }
  get claims() { return this.oauthService.getIdentityClaims(); }

  constructor(public router: Router, public oauthService: OAuthService) {
        // For debugging:
    oauthService.events.subscribe(e => e instanceof OAuthErrorEvent ? console.error(e) : console.warn(e));

    // Load information from Auth0 (could also be configured manually)
    oauthService.loadDiscoveryDocument()

      // See if the hash fragment contains tokens (when user got redirected back)
      .then(() => oauthService.tryLogin())

      // If we're still not logged in yet, try with a silent refresh:
      .then(() => {
        if (!oauthService.hasValidAccessToken()) {
          return oauthService.silentRefresh();
        }
      })

      // Get username, if possible.
      .then(() => {
        if (oauthService.getIdentityClaims()) {
          console.log('get user name from ');
          console.log(oauthService.getIdentityClaims());
          this.username = oauthService.getIdentityClaims()['preferred_username'];
        }
      });

    oauthService.setupAutomaticSilentRefresh();

  }



  login() { console.log('login'); this.oauthService.initImplicitFlow(); }
  logout() { console.log('logout'); this.oauthService.logOut(); }
  refresh() { console.log('refresh'); this.oauthService.silentRefresh(); }

  navigateTo(destination) {
    this.router.navigateByUrl('/home');
  }
}


