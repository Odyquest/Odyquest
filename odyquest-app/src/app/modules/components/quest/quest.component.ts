import {Component, EventEmitter, Input, OnInit, OnDestroy, Output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import * as moment from 'moment';
import {Subscription, TimeInterval} from 'rxjs';

import {ChaseStatus, Description, Image} from 'chase-model';
import {Quest, QuestType} from 'chase-model';
import { GameService } from 'src/app/core/services/game.service';
import {QuestStatus} from '../../../core/services/game.service';
import {HintComponent} from '../hint/hint.component';
import {SubmitSolutionComponent} from '../submit-solution/submit-solution.component';
import {TimeService} from './../../../core/services/time.service';

enum SolutionStatus {
  ValidAnswer, InvalidAnswer, WaitingForAnswer
}

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.scss']
})
export class QuestComponent implements OnInit, OnDestroy {
  @Input() quest: Quest;
  @Input() questStatus: QuestStatus;
  @Output() selection: EventEmitter<number> = new EventEmitter();
  @Output() chaseStatus: EventEmitter<ChaseStatus> = new EventEmitter();

  solutionStatus = SolutionStatus.WaitingForAnswer;
  solutionDestination: number|undefined = undefined;
  futureTimeEvent;
  remainingTime = {hours: 0, minutes: 0, seconds: 0};

  subscriptions = new Array<Subscription>();
  timeTicker;
  constructor(
    public dialog: MatDialog,
    public timeService: TimeService,
    private game: GameService
  ) {
  }

  ngOnInit(): void {
    this.resetState();
  }

  resetState(): void {
    this.solutionStatus = SolutionStatus.WaitingForAnswer;

    // delete old timers
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    clearInterval(this.timeTicker);

    // set new timer
    if (this.hasTimeConstraint()) {
      this.subscriptions.push(
          this.timeService.exampleTimer.subscribe(futureTimeEvent => {
            this.futureTimeEvent = futureTimeEvent;
            this.timeTicker = setInterval(() => {
              const diff = futureTimeEvent.diff(moment());
              const duration = moment.duration(diff);

              this.remainingTime.hours = duration.hours();
              this.remainingTime.minutes = duration.minutes();
              this.remainingTime.seconds = duration.seconds();
              if (this.remainingTime.hours === 0
                && this.remainingTime.minutes === 0
                && this.remainingTime.seconds === 0) {
                console.log('failed quest by timeout');
                this.loose();
              }
            }, 1000);
          }));
      this.timeService.setTimer(0, 0, this.questStatus.remainingTime.getTime() / 1000);
    }
  }

  passSolution(): void {
    if (this.solutionStatus === SolutionStatus.ValidAnswer && this.solutionDestination !== undefined) {
      this.selection.emit(this.solutionDestination);
      this.resetState();
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
    this.solutionStatus = SolutionStatus.WaitingForAnswer;
    const dialogRef = this.dialog.open(SubmitSolutionComponent, {
      data: {quest: this.quest},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Submitted: ${result}`);
      const solution = this.quest.requirementCombination.getSolution(result);
      if (solution !== undefined) {
        this.solutionDestination = solution.destination;
        this.solutionStatus = SolutionStatus.ValidAnswer;
        if (this.quest.requirementCombination.getPossibleDestinations().length === 1) {
          this.passSolution();
        }
      } else {
        if (result.length > 0) {
          this.solutionStatus = SolutionStatus.InvalidAnswer;
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

  hint(): void {
    const dialogRef = this.dialog.open(HintComponent, {
      height: '90vh',
      width: '90vw',
      data: {quest: this.quest},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Submitted: ${result}`);
    });
  }

  needsTitleRow(): boolean {
    return this.hasHelp() || !!this.quest.title;
  }

  hasHelp(): boolean {
    return this.quest.hint.length > 0;
  }

  hasSolution(): boolean {
    return this.solutionStatus === SolutionStatus.ValidAnswer;
  }

  hasTimeConstraint(): boolean {
    return this.quest.maxTime && this.quest.maxTime.getTime() > 0;
  }

  hasTriesConstraint(): boolean {
    return this.quest.maxTries && this.quest.maxTries > 0;
  }

  invalidAnswerGiven(): boolean {
    return this.solutionStatus === SolutionStatus.InvalidAnswer;
  }

  validAnswerGiven(): boolean {
    return this.solutionStatus === SolutionStatus.ValidAnswer;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    clearInterval(this.timeTicker);
  }

  getImgClass(): string {
    return 'game_element_image';
  }

  getImage(): Image {
    const image = this.game.chase.getMedia<Image>(this.quest.description.image);
    if (!image) {
      console.log('image not found');
      return new Image();
    }
    return image;
  }
}
