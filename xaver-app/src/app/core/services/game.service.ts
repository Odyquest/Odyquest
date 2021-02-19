import { Injectable } from '@angular/core';

import { ChaseStorageService } from 'src/app/core/services/chaseStorage.service';
import { ChaseStatus } from 'src/app/core/models/chase_status';
import { Chase } from '../../shared/models/chase';
import { GameElement } from '../../shared/models/gameElement';
import { Narrative } from '../../shared/models/narrative';
import { Quest } from '../../shared/models/quest';

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
  currentQuest: Quest;
  currentElement: GameElement;
  currentQuestStatus: QuestStatus;
  startElement: number | undefined;
  finished = false;

  static fromStorage(chaseStorage: ChaseStorageService): GameService {
    const service = new GameService(chaseStorage, chaseStorage.getRunningChase());
    service.startElement = chaseStorage.getCurrentPosition();
    return service;
  }

  constructor(private chaseStorage: ChaseStorageService, public chase: Chase) {
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
    this.chaseStorage.setChaseStatus(this.chase.metaData.id, ChaseStatus.Started);
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
    this.chaseStorage.setChaseStatus(this.chase.metaData.id, chaseStatus);
    this.chaseStorage.deleteRunningChase();
    this.finished = true;
  }
}

