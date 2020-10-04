import { Description } from './description';
import { GameElement } from './gameElement';
import { RequirementCombination } from './requirementCombination';

export enum QuestType {
  Text = 0,
  MultipleChoice = 1,
}

export class Quest extends GameElement {

	questType: QuestType; // enum
	maxTrys: number;
	maxTime: Date; //mm:ss
	displayImageFirst: boolean;
	requirementCombination: RequirementCombination;
	help: Array<Description>;

  getElement(solution: number): GameElement {
    return this.requirementCombination.combinationMap[solution];
  }
}
