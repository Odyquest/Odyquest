import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { deserialize } from 'typescript-json-serializer';

import { ChaseService } from 'src/app/shared/services/chase.service';
import { UiService } from 'src/app/core/services/ui.service';
import { ChaseList, ChaseMetaData } from 'src/app/shared/models/chase';
import { ChaseStorageService } from 'src/app/core/services/chaseStorage.service';
import { ChaseStatus } from 'src/app/core/models/chase_status';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  inputUrl: boolean;
  chaseList = new ChaseList();
  loading = false;

  constructor(private chaseService: ChaseService,
              private router: Router,
              private uiService: UiService,
              private chaseStorage: ChaseStorageService) { }

  ngOnInit(): void {
    this.uiService.toolbarTitle.next('Wähle eine Schnitzeljagd');
    this.chaseService.getAllChases().subscribe(chases => this.chaseList = deserialize<ChaseList>(chases, ChaseList));
  }

  onInputUrl(): void {
    console.log('input url called');
    this.inputUrl = true;
  }

  getChaseList(): Array<ChaseMetaData> {
    return this.chaseList.chases;
  }

  hasRunningChase(): boolean {
    return this.chaseStorage.hasRunningChase();
  }
  getRunningChaseTitle(): any {
    return this.chaseStorage.getRunningChase().metaData.title;
  }
  getRunningChaseId(): any {
    return this.chaseStorage.getRunningChase().metaData.id;
  }

  hasNoChases(): boolean {
    return this.getChaseList().length === 0;
  }

  isSucceeded(chaseId: string): boolean {
    return this.chaseStorage.getChaseStatus(chaseId) === ChaseStatus.Succeeded;
  }
  isFailed(chaseId: string): boolean {
    return this.chaseStorage.getChaseStatus(chaseId) === ChaseStatus.Failed;
  }

  public startChase(id: string): void {
    this.loading = true;
    setTimeout(() => {
        this.loading = false;
        this.router.navigateByUrl('/chase?id=' + id);
    }, 1500);
  }

}

