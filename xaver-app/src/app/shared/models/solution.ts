import { Serializable, JsonProperty } from 'typescript-json-serializer';

import { Description } from './description';
import { GameElement } from './gameElement';

export enum LogicType {
  Or = "or",
  And = "and",
}

@Serializable()
export class Solution extends GameElement {

	@JsonProperty() requiredItems: Array<boolean>;
	@JsonProperty() logicType: LogicType;
	@JsonProperty() description: Description;
	@JsonProperty() destination: number; // GameElementId
}
