import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Audio, AudioFile, AugmentedReality, Media, MediaFile, MediaWithFilelist, NarrativeType, Video, VideoFile } from 'chase-model';
import { ChaseService } from 'chase-services';
import { RuntimeConfigurationService } from 'chase-services';
import { ChaseEditorService } from 'src/app/services/chase-editor.service';

@Component({
  selector: 'app-media-upload',
  templateUrl: './media-upload.component.html',
  styleUrls: ['./media-upload.component.scss']
})
export class MediaUploadComponent implements OnInit {

  @Input() mediaId: string;
  @Input() narrativeType: NarrativeType;
  @Output() mediaIdChange: EventEmitter<string> = new EventEmitter();

  constructor(
    private chaseService: ChaseService,
    public chaseEditor: ChaseEditorService,
    private configuration: RuntimeConfigurationService
  ) { }

  ngOnInit(): void {
  }

  hasMedia(): boolean {
    return this.mediaId && this.mediaId !== ''
      && this.chaseEditor.getChase().getMedia<Media>(this.mediaId) !== undefined;
  }

  addMedia(): void {
    console.log('create new media entry');
    const media = this.createMedia();
    media.chaseId = this.chaseEditor.getChaseId();
    if (this.hasMedia()) {
      media.mediaId = this.mediaId;
    }
    this.chaseService.createOrUpdateMedia(media).subscribe(id => {
      this.mediaId = id;
      media.mediaId = id;
      this.chaseEditor.setMedia(this.mediaId, media);
      this.mediaIdChange.emit(this.mediaId);
    });
  }

  uploadMedia($event): void {
    console.log('Opening file explorer to load local media file...');
    console.log($event.target.files[0]);
    if (!this.chaseEditor.hasChaseId() || this.chaseEditor.getChaseId() === '') {
      console.log('ChaseId not set, can not upload media file.');
      return;
    }
    if (!this.mediaId || this.mediaId === '') {
      console.log('MediaId not set, can not upload media file.');
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', (e) => {
      console.log('upload file with chaseId', this.chaseEditor.getChaseId(), ' and mediaId ', this.mediaId);
      this.chaseService
        .createMediaFile(
          this.chaseEditor.getChaseId(),
          this.mediaId,
          $event.target.files[0]
        )
        .subscribe((media) => {
          console.log('...uploading done');
          // TODO check media type
          this.chaseEditor.setMedia(this.mediaId, media);
        });
    });
    reader.readAsArrayBuffer($event.target.files[0]);
  }

  getDefaultMediaUrl(): string {
    const image = this.chaseEditor.getMedia(this.mediaId);
    if (!(this.mediaId) || !(image instanceof Media)) {
      console.log('MediaId not set or does not point to image, can not get url to image.');
      return '';
    }
    return image.getDefaultUrl(this.configuration.getMediaUrlPrefix());
  }

  updateMediaUrl(url: string): void {
    if (!(this.mediaId)) {
      console.log('MediaId not set, can not set url.');
      return;
    }
    const media = this.chaseEditor.getMedia(this.mediaId) as MediaWithFilelist<MediaFile>;
    // replace all existing files with given url
    // TODO instanciate correct media file type
    media.files = [new MediaFile(url)];
    media.defaultIndex = 0;
    this.chaseEditor.setMedia(this.mediaId, media);
  }

  canUploadMedia(): boolean {
    return this.configuration.isApiBased();
  }

  hasFiles(): boolean {
    return this.mediaId && this.mediaId !== ''
    // && this.chaseEditor.getMedia(this.mediaId) instanceof this.getMediaType()
      && this.chaseEditor.getMedia(this.mediaId).hasFiles();
  }

  hasAudio(): boolean {
    return this.narrativeType === NarrativeType.Audio;
  }
  hasVideo(): boolean {
    return this.narrativeType === NarrativeType.Video;
  }
  getMediaType(): new (...params: any[]) => Media {
    switch (this.narrativeType) {
      case NarrativeType.Audio:
        return Audio;
      case NarrativeType.Video:
        return Video;
    }
  }
  createMedia(): Media {
    switch (this.narrativeType) {
      case NarrativeType.Audio:
        return new Audio();
      case NarrativeType.Video:
        return new Video();
      case NarrativeType.AugmentedReality:
        return new AugmentedReality();
      default:
        console.error('Create media of unknown type');
    }
  }
}
