import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';


import { Narrative, NarrativeStatus } from '../../../shared/models/narrative';
import { FinishStatus } from '../../../core/models/finish_status';

@Component({
  selector: 'app-narrative',
  templateUrl: './narrative.component.html',
  styleUrls: ['./narrative.component.scss']
})
export class NarrativeComponent implements OnInit {
  @Input() narrative: Narrative;
  @Output() selection: EventEmitter<number> = new EventEmitter();



  constructor(private router: Router, private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
  }

  select(button: number): void {
    if (this.narrative.isFinal()) {
      let finishStatus: FinishStatus;
      switch (this.narrative.narrativeStatus) {
          case NarrativeStatus.Win:
          finishStatus = FinishStatus.Success;
          break;
          case NarrativeStatus.Loose:
          finishStatus = FinishStatus.Failed;
          break;
      }
      setTimeout(() => { this.router.navigateByUrl('/finished?status=' + finishStatus); }, 1500);
    } else {
      this.selection.emit(button);
    }
  }

  getImage(): SafeResourceUrl {
     return this.sanitizer.bypassSecurityTrustUrl(this.narrative.description.image);
  }
}
