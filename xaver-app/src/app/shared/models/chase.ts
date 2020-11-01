import { Preview } from './preview';
import { Quest } from './quest';
import { GameElement } from './gameElement';
export class Chase {

	id?: number;
	version?: number; // nein bred, nicht was du denkst
	title: string;
	description: string;
	preview: Preview;
	author: string; //Author;
	lastEdited: Date;
	creationDate: Date;
	comment?: string;
	gameElements: Map<number, GameElement>;
	initialGameElement: number; // GameElementID
	tags?: Array<string>;

	getElement(destination: number): GameElement {
		return this.gameElements[destination];
	}

}
