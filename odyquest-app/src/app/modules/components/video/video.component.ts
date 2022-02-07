import { Component, Input, OnInit } from '@angular/core';

import { Video } from 'chase-model';
import { RuntimeConfigurationService } from 'chase-services';

class VideoSource {
  url: string;
  mimetype: string;

  constructor(url: string, mimetype: string) {
    this.url = url;
    this.mimetype = mimetype;
  }
}

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @Input() video: Video;
  url: string;
  mimetype: string;

  constructor(
    private configuration: RuntimeConfigurationService
  ) { }

  ngOnInit(): void {
    // TODO
  }

  getSources(): VideoSource[] {
    const sources: VideoSource[] = [];
    if (this.video.hasFiles()) {
      for (let i = 0; i < this.video.files.length; i++) {
        sources.push(new VideoSource(this.video.getUrlByIndex(this.configuration.getMediaUrlPrefix(), i), this.video.files[i].mimetype));
      }
    }
    return sources;
  }
}
