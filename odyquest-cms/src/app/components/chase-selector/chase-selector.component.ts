import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ChaseList, ChaseSummary, Image } from 'chase-model';
import { ChaseService, RuntimeConfigurationService } from 'chase-services';

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
              private configuration: RuntimeConfigurationService,
              private router: Router) { }

  ngOnInit(): void {
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

  getMatCardImageClass(): string {
    return 'card-image';
  }
  getImage(mediaId: string, chase: ChaseSummary): Image {
    if (!chase.media.has(mediaId)) {
      console.error("could not find image ", mediaId);
    }
    return chase.media.get(mediaId) as Image;
  }
  getAuthorImageUrl(mediaId: string, chase: ChaseSummary): string {
    if (!chase.media.has(mediaId)) {
      console.error("could not find image ", mediaId);
    }
    return chase.media.get(mediaId).getDefaultUrl(this.configuration.getMediaUrlPrefix());
  }
}

