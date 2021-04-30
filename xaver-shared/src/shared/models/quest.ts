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

	@JsonProperty() questType: QuestType = QuestType.Text; // enum
	@JsonProperty() maxTries?: number;
	@JsonProperty() maxTime?: Date; //mm:ss
	@JsonProperty() displayImageFirst: boolean = false;
	@JsonProperty({ type: RequirementCombination, }) requirementCombination = new RequirementCombination();

  copyFromQuest(quest:Quest) {
    this.copyFromGameElement(quest);
    this.questType = quest.questType;
    if (quest.maxTries) {
      this.maxTries = quest.maxTries;
    }
    if (quest.maxTime) {
      this.maxTime = quest.maxTime;
    }
    this.displayImageFirst = quest.displayImageFirst;
    this.requirementCombination = quest.requirementCombination;
  }
}
