import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import * as moment from 'moment';
import {Subscription, TimeInterval} from 'rxjs';

import {QuestStatus} from '../../../core/services/game.service';
import {Description} from '../../../shared/models/description';
import {Quest, QuestType} from '../../../shared/models/quest';
import {HelpComponent} from '../help/help.component';
import {SubmitSolutionComponent} from '../submit-solution/submit-solution.component';
import {TimeService} from './../../../core/services/time.service';
import {ChaseStatus} from './../../../core/models/chase_status';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.scss']
})
export class QuestComponent implements OnInit {
  @Input() quest: Quest;
  @Input() questStatus: QuestStatus;
  @Output() selection: EventEmitter<number> = new EventEmitter();
  @Output() chaseStatus: EventEmitter<ChaseStatus> = new EventEmitter();
  validSolution: number|undefined = undefined;
  futureTimeEvent;
  remainingTime = {hours: 0, minutes: 0, seconds: 0};

  subscriptions = new Array<Subscription>();
  timeTicker;
  timerSet = false;
  constructor(public dialog: MatDialog, public timeService: TimeService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.subscriptions.push(
        this.timeService.exampleTimer.subscribe(futureTimeEvent => {
          this.futureTimeEvent = futureTimeEvent;
          this.timeTicker = setInterval(() => {
            const diff = futureTimeEvent.diff(moment());
            const duration = moment.duration(diff);

            this.remainingTime.hours = duration.hours();
            this.remainingTime.minutes = duration.minutes();
            this.remainingTime.seconds = duration.seconds();
            this.timerSet = true;
            if (this.remainingTime.hours === 0
              && this.remainingTime.minutes === 0
              && this.remainingTime.seconds === 0) {
              console.log('failed quest by timeout');
              this.loose();
            }
          }, 1000);
        }));
    this.timeService.setTimer(0, 10, 0);
  }

  select(button: string): void {
    if (this.validSolution !== undefined) {
      this.selection.emit(this.validSolution);
    } else {
      console.log('There is no valid solution!');
      // TODO
    }
  }

  loose(): void {
    // TODO display popup
    this.chaseStatus.emit(ChaseStatus.Failed);
  }

  submit(): void {
    const dialogRef = this.dialog.open(SubmitSolutionComponent, {
      data: {quest: this.quest},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Submitted: ${result}`);
      const solution = this.quest.requirementCombination.getSolution(result);
      if (solution !== undefined) {
        this.validSolution = solution.destination;
      } else {
        if (result.length > 0) {
          this.questStatus.remainingTries--;
          console.log('remaining tries: ' + this.questStatus.remainingTries);
          if (this.questStatus.remainingTries === 0) {
            console.log('failed quest by run out of tries');
            this.loose();
          }
        }
      }
    });
  }

  help(): void {
    const dialogRef = this.dialog.open(HelpComponent, {
      height: '90vh',
      width: '90vw',
      data: {quest: this.quest, status: this.questStatus},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Submitted: ${result}`);
    });
  }

  hasHelp(): boolean {
    return this.quest.help.length > 0;
  }

  hasSolution(): boolean {
    return this.validSolution !== undefined;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    clearInterval(this.timeTicker);
  }

  getImage(): SafeResourceUrl {
     return this.sanitizer.bypassSecurityTrustUrl(this.quest.description.image);
  }
}
