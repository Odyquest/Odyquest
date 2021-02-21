import { Serializable, JsonProperty } from 'typescript-json-serializer';

import { Description } from './description';
import { GameElement } from './gameElement';

export enum LogicType {
  Or = "or",
  And = "and",
}

/**
 * Represents a possible solution of the quest and the destination where to continue the chase.
 */
@Serializable()
export class SolutionTerm {

	/** for each entry in solutionItems of the required combination, define whether it is expected or not */
	@JsonProperty() requiredItems: Array<boolean> = [true];
	/** logic operation to connect the required items to check whether this solution is fullfilled */
	@JsonProperty() logicType: LogicType = LogicType.And;
	/** points to entry of game element map with type solution */
	@JsonProperty() destination: number = 1;
}
