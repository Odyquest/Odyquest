import { Serializable, JsonProperty } from 'typescript-json-serializer';

import { Description } from './description';
import { GameElement } from './gameElement';
import { RequirementCombination } from './requirementCombination';

export enum QuestType {
  Text = 0,
  MultipleChoice = 1,
}

@Serializable()
export class Quest extends GameElement {

	@JsonProperty() questType: QuestType; // enum
	@JsonProperty() maxTries: number;
	@JsonProperty() maxTime: Date; //mm:ss
	@JsonProperty() displayImageFirst: boolean;
	@JsonProperty() requirementCombination: RequirementCombination;
	@JsonProperty({ type: Description }) help: Array<Description>;

  getElement(solution: number): GameElement {
    return this.requirementCombination.combinationMap[solution];
  }
}
