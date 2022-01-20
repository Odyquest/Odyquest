import { Component, Input, OnInit } from '@angular/core';

import { Video } from 'chase-model';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @Input() video: Video;
  url: string;
  mimetype: string;

  constructor() { }

  ngOnInit(): void {
    // TODO
  }

}
