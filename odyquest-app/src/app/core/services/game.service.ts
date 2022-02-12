import { Injectable } from '@angular/core';

import { ChaseStorageService } from 'chase-services';
import { ChaseStatus } from 'chase-model';
import { Chase } from 'chase-model';
import { GameElement } from 'chase-model';
import { Narrative } from 'chase-model';
import { Quest } from 'chase-model';

export class QuestStatus {
  remainingTries: number;
  remainingTime: Date;

  constructor(quest: Quest) {
    this.remainingTries = quest.maxTries;
    this.remainingTime = quest.maxTime;
  }
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  chase: Chase;
  currentQuest: Quest;
  currentElement: GameElement;
  currentQuestStatus: QuestStatus;
  startElement: number | undefined;
  finished = false;

  constructor(private chaseStorage: ChaseStorageService) {
  }

  startChase(chase: Chase): void {
    this.chase = chase;
  }

  startChaseFromStorage(): void {
    this.chase = this.chaseStorage.getRunningChase();
    this.startElement = this.chaseStorage.getCurrentPosition();
  }

  startQuest(quest: Quest): void {
    this.currentQuestStatus = new QuestStatus(quest);
    this.currentQuest = quest;
  }

  getQuestStatus(): QuestStatus {
    return this.currentQuestStatus;
  }

  continueWith(element: number): GameElement {
    this.chaseStorage.setCurrentPosition(element);
    this.currentElement = this.chase.getElement(element);

    if (this.currentElement instanceof Quest) {
      const quest = this.currentElement as Quest;
      this.startQuest(quest);
    }
    return this.currentElement;
  }

  isFinalElement(): boolean {
    if (this.currentElement instanceof Narrative) {
      return (this.currentElement as Narrative).isFinal();
    }
    return false;
  }

  start(): GameElement {
    this.chaseStorage.setRunningChase(this.chase);
    this.chaseStorage.setChaseStatus(this.chase.metaData.chaseId, ChaseStatus.Started);
    if (this.startElement) {
      return this.continueWith(this.startElement);
    } else {
      return this.continueWith(this.chase.initialGameElement);
    }
  }

  isFinished(): boolean {
    return this.finished;
  }

  finish(chaseStatus: ChaseStatus): void {
    this.chaseStorage.setChaseStatus(this.chase.metaData.chaseId, chaseStatus);
    this.chaseStorage.deleteRunningChase();
    this.finished = true;
  }
}

