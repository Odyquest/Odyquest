import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

import { Narrative } from '../../../shared/models/narrative';

@Component({
  selector: 'app-narrative',
  templateUrl: './narrative.component.html',
  styleUrls: ['./narrative.component.scss']
})
export class NarrativeComponent implements OnInit {
  @Input() narrative: Narrative;
  @Output() selection: EventEmitter<number> = new EventEmitter();


  constructor(private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
  }

  select(button: number): void {
    // console.log('narrative: ' + button + ' selected');
    this.selection.emit(button);
  }

  getImage(): SafeResourceUrl {
     return this.sanitizer.bypassSecurityTrustUrl(this.narrative.description.image);
  }
}
