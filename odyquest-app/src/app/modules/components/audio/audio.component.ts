import { Component, Input, OnInit } from '@angular/core';

import { Audio, AudioFile } from 'chase-model';
import { RuntimeConfigurationService } from 'chase-services';

class AudioSource {
  url: string;
  mimetype: string;

  constructor(url: string, mimetype: string) {
    this.url = url;
    this.mimetype = mimetype;
  }
}

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {
  @Input() audio: Audio;
  url: string;
  mimetype: string;

  constructor(
    private configuration: RuntimeConfigurationService
  ) { }

  ngOnInit(): void {
    // TODO
  }

  getSources(): AudioSource[] {
    const sources: AudioSource[] = [];
    if (this.audio.hasFiles()) {
      for (let i = 0; i < this.audio.files.length; i++) {
        sources.push(new AudioSource(this.audio.getUrlByIndex(this.configuration.getStreamUrlPrefix(), i), this.audio.files[i].mimetype));
      }
    }
    return sources;
  }
}
