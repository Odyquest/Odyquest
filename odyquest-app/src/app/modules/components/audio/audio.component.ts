import { Component, Input, OnInit } from '@angular/core';

import { Audio } from 'chase-model';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {
  @Input() audio: Audio;
  url: string;
  mimetype: string;

  constructor() { }

  ngOnInit(): void {
    // TODO
  }
}
