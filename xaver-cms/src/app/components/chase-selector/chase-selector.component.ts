// import { UiService } from 'src/app/core/services/ui.service';
import { ChaseList, ChaseMetaData } from 'src/app/shared/models/chase';
import { Component, Input, OnInit } from '@angular/core';

import { ChaseService } from 'src/app/shared/services/chase.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { deserialize } from 'typescript-json-serializer';

// import { ChaseStorageService } from 'src/app/core/services/chaseStorage.service';
// import { ChaseStatus } from 'src/app/core/models/chase_status';

@Component({
  selector: 'app-chase-selector',
  templateUrl: './chase-selector.component.html',
  styleUrls: ['./chase-selector.component.scss']
})
export class ChaseSelectorComponent implements OnInit {
  inputUrl: boolean;
  chaseList = new ChaseList();
  loading = false;

  constructor(private chaseService: ChaseService,
              private router: Router) { }

  ngOnInit(): void {
    this.chaseService.getAllChases().subscribe(chases => this.chaseList = chases);
  }

  onInputUrl(): void {
    console.log('input url called');
    this.inputUrl = true;
  }

  getChaseList(): Array<ChaseMetaData> {
    return this.chaseList.chases;
  }

  hasNoChases(): boolean {
    return this.getChaseList().length === 0;
  }

  public editChase(id: string): void {
    this.loading = true;
    setTimeout(() => {
        this.loading = false;
        this.router.navigateByUrl('/editor?id=' + id);
    }, 1500);
  }

}

