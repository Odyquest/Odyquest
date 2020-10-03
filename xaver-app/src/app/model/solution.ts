import { Description } from './description';

export class Solution {

	requiredItems: Array<boolean>;
	logicType: string; // TODO: enum logic types
	description: Description;
	destination: number; // GameElementId
}
