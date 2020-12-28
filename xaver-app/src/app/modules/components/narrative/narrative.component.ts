import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

import { Narrative, NarrativeStatus, NarrativeType } from 'src/app/shared/models/narrative';
import { ChaseStatus } from 'src/app/core/models/chase_status';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-narrative',
  templateUrl: './narrative.component.html',
  styleUrls: ['./narrative.component.scss']
})
export class NarrativeComponent implements OnInit {
  @Input() narrative: Narrative;
  @Output() selection: EventEmitter<number> = new EventEmitter();
  @Output() chaseStatus: EventEmitter<ChaseStatus> = new EventEmitter();

  constructor(private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
  }

  select(button: number): void {
    if (this.narrative.isFinal()) {
      let chaseStatus: ChaseStatus;
      switch (this.narrative.narrativeStatus) {
          case NarrativeStatus.Win:
          chaseStatus = ChaseStatus.Succeeded;
          break;
          case NarrativeStatus.Loose:
          chaseStatus = ChaseStatus.Failed;
          break;
      }
      this.chaseStatus.emit(chaseStatus);
    } else {
      this.selection.emit(button);
    }
  }

  getImage(): SafeResourceUrl {
     return this.sanitizer.bypassSecurityTrustUrl(this.narrative.description.image);
  }

  isDefaultLayout(): boolean {
    return this.narrative.narrativeType === NarrativeType.Text
      || this.narrative.narrativeType === NarrativeType.Audio;
  }
  isPanoramaLayout(): boolean {
    return this.narrative.narrativeType === NarrativeType.Panorama
      || this.narrative.narrativeType === NarrativeType.Video;
  }
  isAudioType(): boolean {
    return this.narrative.narrativeType === NarrativeType.Audio;
  }
  isVideoType(): boolean {
    return this.narrative.narrativeType === NarrativeType.Video;
  }
}
