import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // public hide;

  constructor(router: Router, public oauthService: OAuthService) {
    //router.events.forEach(event => {
    //  if (event instanceof NavigationStart) {
    //    switch (event.url) {
    //      case '/login':
    //        break;
    //      case '/case':
    //        break;
    //      default:
    //        this.widget.remove();
    //        break;
    //    }
    //  }
    //});
  }



  ngOnInit(): void {
    //this.widget.renderEl({
    //  el: '#signin-container'
    //},
    //  (res) => {
    //    if (res.status === 'SUCCESS') {
    //      this.signIn.loginRedirect('/', { sessionToken: res.session.token });
    //      // Hide the widget
    //      this.widget.hide();
    //    }
    //  },
    //  (err) => {
    //    throw err;
    //  }
    //);
  }

  login() { console.log('login'); this.oauthService.initImplicitFlow(); }
}
