import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Audio, AudioFile, Media, MediaFile, NarrativeType, Video, VideoFile } from 'chase-model';
import { ChaseService } from 'chase-services';
import { RuntimeConfigurationService } from 'chase-services';

@Component({
  selector: 'app-media-upload',
  templateUrl: './media-upload.component.html',
  styleUrls: ['./media-upload.component.scss']
})
export class MediaUploadComponent implements OnInit {

  @Input() media: Media;
  @Input() narrativeType: NarrativeType;
  @Input() chaseId: string;
  @Output() mediaChange: EventEmitter<Media> = new EventEmitter();

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
          if (this.hasAudio()) {
            const audio = new AudioFile(res.url, res.mimetype, 1);
            (this.media as Audio).files = [audio];
            (this.media as Audio).defaultIndex = 0;
          } else if (this.hasVideo()) {
            const video = new VideoFile(res.url, res.mimetype, 1);
            (this.media as Video).files = [video];
            (this.media as Video).defaultIndex = 0;
          } else {
            console.error('media upload is not implemented for ', this.narrativeType);
          }
          this.mediaChange.emit(this.media);
        });
    });
    reader.readAsArrayBuffer($event.target.files[0]);
  }

  addMedia(url: string): void {
    // TODO get type
    this.mediaChange.emit(this.media);
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

  getDefaultFileUrl(): string {
    if (!this.media.getDefaultFile()) {
      return '';
    }
    return this.media.getDefaultUrl(this.configuration.getMediaUrlPrefix());
  }
  // getTypesFormats(): Array<[string, number]> {
  //   if (this.hasAudio()) {
  //     return (this.media as Audio).formatResolutionTuples;
  //   } else if (this.hasVideo()) {
  //     return (this.media as Video).formatResolutionTuples;
  //   } else {
  //     return [];
  //   }
  // }
}
