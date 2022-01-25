import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ChaseService } from 'chase-services';
import { RuntimeConfigurationService } from 'chase-services';
import { Image, ImageFile } from 'chase-model';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  @Input() image: Image;
  @Input() chaseId: string;
  @Output() imageChange: EventEmitter<Image> = new EventEmitter();

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
          this.updateImageUrl(res.url);
        });
    });
    reader.readAsArrayBuffer($event.target.files[0]);
  }

  getDefaultImageUrl(): string {
    if (!(this.image instanceof Image) || !this.image.getDefaultFile()) {
      return '';
    }
    return this.image.getDefaultFile().url;
  }

  updateImageUrl(url: string): void {
    // replace all existing files with given url
    this.image.files = [new ImageFile(url, 1)];
    this.image.defaultIndex = 0;
    this.imageChange.emit(this.image);
  }

  canUploadImage(): boolean {
    return this.configuration.isApiBased();
  }

  hasFiles(): boolean {
    return this.image instanceof Image && this.image.hasFiles();
  }
}
