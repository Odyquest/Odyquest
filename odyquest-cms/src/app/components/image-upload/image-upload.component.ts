import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ChaseService } from 'chase-services';
import { RuntimeConfigurationService } from 'chase-services';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  @Input() imageUrl: string;
  @Input() chaseId: string;
  @Output() updateUrl: EventEmitter<string> = new EventEmitter();

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
          // update image and url fields
          this.imageUrl = res.url;
        });
    });
    reader.readAsArrayBuffer($event.target.files[0]);
  }

  updateImageUrl(url: string): void {
    this.updateUrl.emit(this.imageUrl);
  }

  canUploadImage(): boolean {
    return this.configuration.isApiBased();

  }
}
