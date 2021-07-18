import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
//import { OktaAuthService } from '@okta/okta-angular';
//import * as OktaSignIn from '@okta/okta-signin-widget';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // public hide;

  constructor(router: Router) {
    //this.signIn = oktaAuth;

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
    //  el: '#okta-signin-container'
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

}
