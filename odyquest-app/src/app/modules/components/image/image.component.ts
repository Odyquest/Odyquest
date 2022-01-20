import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RuntimeConfigurationService } from 'chase-services';

import { Description, Image, ImageFile, Media } from 'chase-model';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  @Input() image: Image;
  @Input() imgClass: string;
  files: ImageFile[];

  constructor(
    private sanitizer: DomSanitizer,
    private configuration: RuntimeConfigurationService
  ) {
  }

  ngOnInit(): void {
    console.log('got image with id ', this.image.id);
    console.log('image has ', this.image.files.length, ' files');
    console.log('image is Media ', this.image instanceof Media);
    if (this.image.hasFiles()) {
      this.files = this.image.getFilesSortedByResolution();
    }
  }

  getImage(): SafeResourceUrl {
    let imageUrl = '';
    if (this.image.files.length !== 0) {
      imageUrl = this.image.files[0].url;
    }
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  /**
   * Returns string for "srcset" attribute of img tag
   */
  getImageSrcset(): string {
    let srcset = '';

    for (const file of this.image.files) {
      srcset += file.url + ' ' + file.width + 'w, ';
    }
    return srcset;
  }

  getClass(): string {
    return this.imgClass;
  }
}
