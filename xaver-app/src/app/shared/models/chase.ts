import { deserialize, Serializable, JsonProperty } from 'typescript-json-serializer';

import { Preview } from './preview';
import { Narrative } from './narrative';
import { Quest } from './quest';
import { Solution } from './solution';
import { GameElement } from './gameElement';

@Serializable()
export class ChaseMetaData {
	@JsonProperty() id?: number;
	@JsonProperty() version?: number; // nein bred, nicht was du denkst
	@JsonProperty() title: string;
	@JsonProperty() description: string;
	@JsonProperty() preview: Preview;
	@JsonProperty() author: string; //Author;
	@JsonProperty() lastEdited: Date;
	@JsonProperty() creationDate: Date;
	@JsonProperty() comment?: string;
}

@Serializable()
export class Chase {
	@JsonProperty() metaData: ChaseMetaData;
	@JsonProperty({
    names: ['_narratives', '_quests', '_solutions'],
    isDictionary: true,
    onDeserialize: value => {
      console.log('deserialize gameElement');
      const gameElements = new Map<number, GameElement>();
      for (const v in value._narratives) {
        console.log('add ' + v + ' as narrative');
        const narrative = deserialize<Narrative>(value._narratives[v], Narrative);
        gameElements[v] = narrative;
      }
      for (const v in value._quests) {
        console.log('add ' + v + ' as Quest');
        gameElements[v] = deserialize<Quest>(value._quests[v], Quest);
      }
      for (const v in value._solutions) {
        console.log('add ' + v + ' as solution');
        gameElements[v] = deserialize<Solution>(value._solutions[v], Solution);
      }
      return gameElements;
    },
    onSerialize: value => {
      console.log('serialize gameElement');
      const narratives = new Map<number, Narrative>();
      const quests = new Map<number, Narrative>();
      const solutions = new Map<number, Narrative>();
      for (const element in value) {
        if (value[element].buttons) {
          console.log('serialize narrative');
          narratives[element] = value[element];
        } else if (value[element].questType) {
          console.log('serialize quest');
          quests[element] = value[element];
        } else if (value[element].solutionType) {
          console.log('serialize solution');
          solutions[element] = value[element];
        }
      }
      return {
        _narratives: narratives,
        _quests: quests,
        _solutions: solutions
      };
    }
  }) gameElements: Map<number, GameElement>;
	@JsonProperty() initialGameElement: number; // GameElementID
	@JsonProperty() tags?: Array<string>;

	getElement(destination: number): GameElement {
		return this.gameElements[destination];
	}

}
