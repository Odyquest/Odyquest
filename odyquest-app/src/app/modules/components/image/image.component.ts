import { Component, Input, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { RuntimeConfigurationService } from 'chase-services';

import { Description } from 'chase-model';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  @Input() description: Description;
  @Input() imgClass: string;
  smallestResolution: number;

  constructor(
    private sanitizer: DomSanitizer,
    private configuration: RuntimeConfigurationService
  ) {
  }

  ngOnInit(): void {
    if (this.hasDifferentImageSizes()) {
      this.smallestResolution = this.description.image_res[0];
      for (const res of this.description.image_res) {
        if (res < this.smallestResolution) {
          this.smallestResolution = res;
        }
      }
    }
  }

  getImage(): SafeResourceUrl {
    let imageUrl = this.description.image;
    if (this.hasDifferentImageSizes()) {
      // use smallest resolution for initial value, the browser may loads this image first and then the image with the
      // correct resolution
      imageUrl = this.getImageUrl(this.smallestResolution);
    }
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  hasDifferentImageSizes(): boolean {
    return this.description.image_res && this.description.image_res.length !== 0;
  }

  /**
   * Returns string for "srcset" attribute of img tag
   */
  getImageSrcset(): string {
    let srcset = '';

    for (const res of this.description.image_res) {
      srcset += this.getImageUrl(res) + ' ' + res + 'w, ';
    }
    return srcset;
  }

  /**
   * Returns url to image with given size
   */
  getImageUrl(res: number): string {
    if (this.configuration.isApiBased()) {
      return this.description.image + '?res=' + res;
    } else {
      const posExtension = this.description.image.lastIndexOf('.');
      const length = this.description.image.length;
      const name = this.description.image.substring(0, posExtension);
      const extension = this.description.image.substring(posExtension, length);
      return name + '_' + res + extension;
    }
  }

  getClass(): string {
    return this.imgClass;
  }
}
