import { Serializable, JsonProperty } from 'typescript-json-serializer';

import { Description } from './description';
import { GameElement } from './gameElement';
import { RequirementCombination } from './requirementCombination';

export enum QuestType {
  Text = 'text',
  MultipleChoice = 'multiple_choice',
}

@Serializable()
export class Quest extends GameElement {

	@JsonProperty() questType: QuestType; // enum
	@JsonProperty() maxTries: number;
	@JsonProperty() maxTime: Date; //mm:ss
	@JsonProperty() displayImageFirst: boolean;
	@JsonProperty() requirementCombination: RequirementCombination;

}
