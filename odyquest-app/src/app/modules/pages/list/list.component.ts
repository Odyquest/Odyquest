import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Chase, ChaseList, ChaseSummary, ChaseStatus, ChaseMetaData, Image, Preview } from 'chase-model';
import { ChaseService, ChaseStorageService, RuntimeConfigurationService } from 'chase-services';
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

  constructor(private chaseService: ChaseService,
              private configuration: RuntimeConfigurationService,
              private router: Router,
              private uiService: UiService,
              private chaseStorage: ChaseStorageService) { }

  ngOnInit(): void {
    this.uiService.toolbarTitle.next('Wähle eine Schnitzeljagd');
    this.chaseService.getAllChases().subscribe(chases => {
      this.chaseList = chases;
    });
  }

  onInputUrl(): void {
    console.log('input url called');
    this.inputUrl = true;
  }

  getChaseList(): Array<ChaseSummary> {
    return this.chaseList.chases;
  }

  hasRunningChase(): boolean {
    return this.chaseStorage.hasRunningChase();
  }
  getRunningChaseTitle(): string {
    return this.chaseStorage.getRunningChase().metaData.title;
  }
  getRunningChasePreviewImage(): Image {
    return this.getPreviewImage(this.chaseStorage.getRunningChase());
  }
  getRunningChaseText(): string {
    return this.chaseStorage.getRunningChase().metaData.preview.text;
  }
  getRunningChaseId(): string {
    return this.chaseStorage.getRunningChase().metaData.chaseId;
  }
  cancleRunningChase(): void {
    this.chaseStorage.deleteRunningChase();
  }

  hasNoChases(): boolean {
    return this.getChaseList().length === 0;
  }

  getPreviewImage(chase: ChaseSummary|Chase): Image {
    return this.getImage(chase.metaData.preview.image, chase);
  }
  getAuthorImageUrl(chase: ChaseSummary): string {
    const mediaId = chase.metaData.author.image;
    if (!chase.media.has(mediaId)) {
      console.error("could not find image ", mediaId);
    }
    return chase.media.get(mediaId).getDefaultUrl(this.configuration.getMediaUrlPrefix());
  }
  getImage(mediaId: string, chase: ChaseSummary|Chase): Image {
    if (!chase.media.has(mediaId)) {
      console.error("could not find image ", mediaId);
    }
    return chase.media.get(mediaId) as Image;
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

