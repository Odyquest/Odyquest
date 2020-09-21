import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuthenticated: boolean;
  title = 'xaver-cms';
  userName;

  constructor(public router: Router, public oktaAuth: OktaAuthService) {

    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  }

  async ngOnInit() {
    // Get the authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();

    if(this.isAuthenticated) {

    const userClaims = await this.oktaAuth.getUser();
    this.userName = userClaims.name;
    }

  }

  login() {
    this.oktaAuth.loginRedirect('/home');
  }

  async logout() {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.logout({
      postLogoutRedirectUri: "http://localhost:4200/logged-out"
    });

  }

  navigateTo(destination) {
    this.router.navigateByUrl('/home');
  }
}


