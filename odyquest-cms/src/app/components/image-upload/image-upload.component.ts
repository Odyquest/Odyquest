import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ChaseService } from 'chase-services';
import { RuntimeConfigurationService } from 'chase-services';
import { Image, ImageFile } from 'chase-model';
import { ChaseEditorService } from 'src/app/services/chase-editor.service';
import { ImageSelectionComponent } from 'src/app/components/image-selection/image-selection.component';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  @Input() mediaId: string;
  @Input() label: string;
  @Output() mediaIdChange: EventEmitter<string> = new EventEmitter();

  constructor(
    private chaseService: ChaseService,
    private configuration: RuntimeConfigurationService,
    public chaseEditor: ChaseEditorService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  hasImage(): boolean {
    return this.mediaId && this.mediaId !== ''
      && this.chaseEditor.getImage(this.mediaId) instanceof Image;
  }

  addImage(): void {
    console.log('create new media entry');
    const image = new Image();
    image.chaseId = this.chaseEditor.getChaseId();
    if (this.hasImage()) {
      image.mediaId = this.mediaId;
    }
    this.chaseService.createOrUpdateMedia(image).subscribe(id => {
      this.mediaId = id;
      image.mediaId = id;
      this.chaseEditor.setImage(this.mediaId, image);
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
          this.chaseEditor.setImage(this.mediaId, media as Image);
        });
    });
    reader.readAsArrayBuffer($event.target.files[0]);
  }

  getDefaultImageUrl(): string {
    const image = this.chaseEditor.getImage(this.mediaId);
    if (!(this.mediaId) || !(image instanceof Image)) {
      console.log('MediaId not set or does not point to image, can not get url to image.');
      return '';
    }
    return image.getDefaultUrl(this.configuration.getMediaUrlPrefix());
  }

  updateImageUrl(url: string): void {
    if (!(this.mediaId)) {
      console.log('MediaId not set, can not set url.');
      return;
    }
    const image = this.chaseEditor.getImage(this.mediaId);
    // replace all existing files with given url
    image.files = [new ImageFile(url, 1)];
    image.defaultIndex = 0;
    this.chaseEditor.setImage(this.mediaId, image);
  }

  canUploadNewImage(): boolean {
    return this.configuration.isApiBased() && !this.hasFiles();
  }

  hasFiles(): boolean {
    return this.mediaId && this.mediaId !== ''
      && this.chaseEditor.getImage(this.mediaId) instanceof Image
      && this.chaseEditor.getImage(this.mediaId).hasFiles();
  }

  getMatCardImageClass(): string {
    return 'game_element_image';
  }

  selectImage(): void {
    const dialogRef = this.dialog.open(ImageSelectionComponent, {
      height: '90vh',
      width: '200px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        console.log(`Select media id ${result}`);
        this.mediaId = result
        this.mediaIdChange.emit(this.mediaId);
      }
    });
  }
}
