import { Injectable } from '@angular/core';

import { ChaseStorageService } from 'src/app/core/services/chaseStorage.service';
import { Chase } from '../../shared/models/chase';
import { GameElement } from '../../shared/models/gameElement';
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

  start(): GameElement {
    this.chaseStorage.setRunningChase(this.chase);
    const pos = this.chaseStorage.getCurrentPosition();
    if (pos !== undefined) {
      console.log('continue with stored position');
      return this.continueWith(pos);
    } else {
      console.log('start from beginning');
      return this.continueWith(this.chase.initialGameElement);
    }
  }

  finish(chaseStatus: ChaseStatus): void {
    this.chaseStorage.setChaseStatus(this.chase.metaData.chaseId, chaseStatus);
  }
}

