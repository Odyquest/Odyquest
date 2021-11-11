import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RuntimeConfigurationService } from 'chase-services';
import { UiService } from 'src/app/core/services/ui.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  loading = false;

  constructor(private router: Router,
              private uiService: UiService,
              private configuration: RuntimeConfigurationService
             ) { }

  ngOnInit(): void {
  }

  getTitle(): string {
    return this.configuration.getTitleText($localize`:@@locale:en`);
  }

  getSubtitle(): string {
    return this.configuration.getSubtitleText($localize`:@@locale:en`);
  }
}
