import { Description } from './description';
import { GameElement } from './gameElement';

export class Solution extends GameElement {

	requiredItems: Array<boolean>;
	logicType: string; // TODO: enum logic types
	description: Description;
	destination: number; // GameElementId
}
