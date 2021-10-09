import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UiService } from 'src/app/core/services/ui.service';

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
}
