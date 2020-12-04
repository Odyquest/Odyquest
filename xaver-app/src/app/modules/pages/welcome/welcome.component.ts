import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UiService } from './../../../core/services/ui.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  loading = false;

  constructor(private router: Router, private uiService: UiService) { }

  ngOnInit(): void {
  }


  public showList() {
    this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.router.navigateByUrl('/list');
      }, 1500);
  }

}
