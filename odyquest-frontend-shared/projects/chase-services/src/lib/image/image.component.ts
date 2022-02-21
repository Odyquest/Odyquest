import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RuntimeConfigurationService } from '../runtime-configuration.service';

import { Description, Image, ImageFile, Media } from 'chase-model';

@Component({
  selector: 'chase-image',
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
    if (this.image.hasFiles()) {
      this.files = this.image.getFilesSortedByResolution();
    }
  }

  getImage(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustUrl(this.image.getDefaultUrl(this.configuration.getMediaUrlPrefix()));
  }

  /**
   * Returns string for "srcset" attribute of img tag
   */
  getImageSrcset(): string {
    let srcset = '';

    for (const file of this.image.files) {
      srcset += this.image.getUrlByName(this.configuration.getMediaUrlPrefix(), file.filename) + ' ' + file.width + 'w, ';
    }
    return srcset;
  }

  getAlternativeText(): string {
    return this.image.alternative;
  }

  getAnnotation(): string {
    return this.image.annotation;
  }

  getClass(): string {
    return this.imgClass;
  }
}
