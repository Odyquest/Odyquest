import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { AugmentedReality } from 'chase-model';

@Component({
  selector: 'app-augmented-reality',
  templateUrl: './augmented-reality.component.html',
  styleUrls: ['./augmented-reality.component.scss']
})
export class AugmentedRealityComponent implements OnInit {
  @Input() ar: AugmentedReality;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  getArUrl(): SafeResourceUrl {
    let url: string;
    if (this.ar.baseUrl.indexOf('http') === 0) {
      url = btoa(this.ar.baseUrl);
    } else {
      url = btoa('../' + this.ar.baseUrl);
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl('assets/ar.html?marker=hiro&model=' + url);
  }
}
