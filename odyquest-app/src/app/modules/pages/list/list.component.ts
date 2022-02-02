import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ChaseList, ChaseMetaData, Image, Preview } from 'chase-model';
import { ChaseStatus } from 'chase-model';
import { ChaseService } from 'chase-services';
import { ChaseStorageService } from 'chase-services';
import { UiService } from 'src/app/core/services/ui.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  inputUrl: boolean;
  chaseList = new ChaseList();
  loading = false;
  images = new Map<string, Image>();

  constructor(private chaseService: ChaseService,
              private router: Router,
              private uiService: UiService,
              private chaseStorage: ChaseStorageService) { }

  ngOnInit(): void {
    this.uiService.toolbarTitle.next('Wähle eine Schnitzeljagd');
    this.chaseService.getAllChases().subscribe(chases => this.chaseList = chases);
    this.chaseList.chases.forEach((chase: ChaseMetaData) => {
      this.chaseService.getMedia(chase.chaseId, chase.preview.image).subscribe(media => {
        this.images.set(chase.chaseId, media as Image);
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

  hasRunningChase(): boolean {
    return this.chaseStorage.hasRunningChase();
  }
  getRunningChaseTitle(): any {
    return this.chaseStorage.getRunningChase().metaData.title;
  }
  getRunningChaseImage(): any {
    return this.getImage(this.chaseStorage.getRunningChase().metaData);
  }
  getRunningChaseText(): any {
    return this.chaseStorage.getRunningChase().metaData.preview.text;
  }
  getRunningChaseId(): any {
    return this.chaseStorage.getRunningChase().metaData.chaseId;
  }

  hasNoChases(): boolean {
    return this.getChaseList().length === 0;
  }

  getImage(chase: ChaseMetaData): Image {
    return this.images.get(chase.chaseId);
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


  getMatCardImageClass(): string {
    return 'card-image';
  }

  showRunningChase(): void {
    document.getElementById('running_chase_text').style.display = 'block';
    document.getElementById('running_chase_img').style.display = 'block';
    document.getElementById('text_show_button').style.display = 'none';
    document.getElementById('text_hide_button').style.display = 'block';
  }
  hideRunningChase(): void {
    document.getElementById('running_chase_text').style.display = 'none';
    document.getElementById('running_chase_img').style.display = 'none';
    document.getElementById('text_show_button').style.display = 'block';
    document.getElementById('text_hide_button').style.display = 'none';
  }

}

