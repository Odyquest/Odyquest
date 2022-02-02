// import { UiService } from 'src/app/core/services/ui.service';
import { ChaseList, ChaseMetaData, Image } from 'chase-model';
import { Component, Input, OnInit } from '@angular/core';

import { ChaseService, RuntimeConfigurationService } from 'chase-services';
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
  imageUrls = new Map<string, string>();

  constructor(private chaseService: ChaseService,
              private configuration: RuntimeConfigurationService,
              private router: Router) { }

  ngOnInit(): void {
    this.chaseService.getAllChases(true).subscribe(chases => this.chaseList = chases);
    this.chaseList.chases.forEach((chase: ChaseMetaData) => {
      this.chaseService.getMedia(chase.chaseId, chase.preview.image).subscribe(media => {
        this.imageUrls.set(chase.chaseId, media.getDefaultUrl(this.configuration.getMediaUrlPrefix()));
      });
    });
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

  public createChase(): void {
    this.loading = true;
    setTimeout(() => {
        this.loading = false;
        this.router.navigateByUrl('/editor?action=new');
    }, 1500);
  }

  public editChase(id: string): void {
    this.loading = true;
    setTimeout(() => {
        this.loading = false;
        this.router.navigateByUrl('/editor?id=' + id);
    }, 1500);
  }

}

