import { Chase } from '../../shared/models/chase';
import { GameElement } from '../../shared/models/gameElement';
import { Quest } from '../../shared/models/quest';
import { getExample } from '../../shared/models/example/chaseExample';

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
  currentQuestStatus: QuestStatus;

  title: string;
  progress: string;
  quests: Array<string>;
  chase: Chase;
  testingCounter = 0;

  constructor(chase: Chase) {
    console.log('create game from ' + JSON.stringify(chase.metaData.title));
    console.log('create game from ' + chase.metaData.title);
    this.chase = chase;
    console.log(this.chase);
  }

  startQuest(quest: Quest): void {
    this.currentQuestStatus = new QuestStatus(quest);
    this.currentQuest = quest;
  }

  getQuestStatus(): QuestStatus {
    return this.currentQuestStatus;
  }

  get_initial_element(): GameElement {
    return this.chase.gameElements[this.chase.initialGameElement];
  }
}

