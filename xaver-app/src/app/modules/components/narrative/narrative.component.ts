import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

import { Narrative, NarrativeStatus, NarrativeType } from 'src/app/shared/models/narrative';
import { ChaseStatus } from 'src/app/core/models/chase_status';
import { GameService } from 'src/app/core/services/game.service';
import { HelpComponent } from '../help/help.component';

@Component({
  selector: 'app-narrative',
  templateUrl: './narrative.component.html',
  styleUrls: ['./narrative.component.scss']
})
export class NarrativeComponent implements OnInit {
  @Input() narrative: Narrative;
  @Output() selection: EventEmitter<number> = new EventEmitter();
  @Output() chaseStatus: EventEmitter<ChaseStatus> = new EventEmitter();

  constructor(public dialog: MatDialog, private sanitizer: DomSanitizer) { }


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

  help(): void {
    const dialogRef = this.dialog.open(HelpComponent, {
      height: '90vh',
      width: '90vw',
      data: {quest: this.narrative},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Submitted: ${result}`);
    });
  }

  needsTitleRow(): boolean {
    return this.hasHelp() || !!this.narrative.title;
  }

  hasHelp(): boolean {
    return this.narrative.help.length > 0;
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
