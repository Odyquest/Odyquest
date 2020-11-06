import { Description } from './description';
import { GameElement } from './gameElement';

export enum LogicType {
  Or = 0,
  And = 1,
}

export class Solution extends GameElement {

	requiredItems: Array<boolean>;
	logicType: LogicType;
	description: Description;
	destination: number; // GameElementId
}
