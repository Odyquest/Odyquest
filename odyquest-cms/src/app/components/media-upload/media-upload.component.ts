import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NarrativeType } from 'chase-model';
import { ChaseService } from 'chase-services';
import { RuntimeConfigurationService } from 'chase-services';

@Component({
  selector: 'app-media-upload',
  templateUrl: './media-upload.component.html',
  styleUrls: ['./media-upload.component.scss']
})
export class MediaUploadComponent implements OnInit {

  @Input() mediaUrl: string;
  @Input() mediaType: string;
  @Input() narrativeType: NarrativeType;
  @Input() chaseId: string;
  @Output() updateUrl: EventEmitter<Array<string>> = new EventEmitter();

  constructor(
    private chaseService: ChaseService,
    private configuration: RuntimeConfigurationService
  ) { }

  ngOnInit(): void {
  }

  uploadMedia($event): void {
    console.log('Opening file explorer to load local media file...');
    console.log($event.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
      console.log('upload file...');
      this.chaseService
        .createMedia(
          this.chaseId,
          '(unnamed)',
          $event.target.files[0]
        )
        .subscribe((res) => {
          console.log('...done: ' + res);
          // update media and url fields
          this.mediaUrl = res.url;
          this.mediaType = res.mimetype;
        });
    });
    reader.readAsArrayBuffer($event.target.files[0]);
  }

  updateMedia(url: string): void {
    // TODO get type
    this.updateUrl.emit([this.mediaUrl, this.mediaType]);
  }

  canUploadMedia(): boolean {
    return this.configuration.isApiBased();

  }

  hasAudio(): boolean {
    return this.narrativeType === NarrativeType.Audio;
  }
  hasVideo(): boolean {
    return this.narrativeType === NarrativeType.Video;
  }
}
