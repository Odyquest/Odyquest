import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userName: string;

  constructor(public oktaAuth: OktaAuthService) { }

  async ngOnInit() {
    // returns an array of claims
    const userClaims = await this.oktaAuth.getUser();

    console.log('GET_USER', await this.oktaAuth.getUser());
    // user name is exposed directly as property
    this.userName = userClaims.name;

  }

}
