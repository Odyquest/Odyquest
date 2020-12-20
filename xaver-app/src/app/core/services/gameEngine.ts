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

export class GameEngine {
  currentQuest: Quest;
  currentElement: GameElement;
  currentQuestStatus: QuestStatus;

  title: string;
  progress: string;
  quests: Array<string>;
  chase: Chase;
  testingCounter = 0;

  constructor(chase: Chase) {
    this.chase = chase;
  }

  startQuest(quest: Quest): void {
    this.currentQuestStatus = new QuestStatus(quest);
    this.currentQuest = quest;
  }

  getQuestStatus(): QuestStatus {
    return this.currentQuestStatus;
  }

  continueWith(element: number): GameElement {
    this.currentElement = this.chase.getElement(element);

    if (this.currentElement instanceof Quest) {
      const quest = this.currentElement as Quest;
      this.startQuest(quest);
    }
    return this.currentElement;
  }

  start(): GameElement {
    return this.continueWith(this.chase.initialGameElement);
  }
}

