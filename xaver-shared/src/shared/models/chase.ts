import { deserialize, serialize, Serializable, JsonProperty } from 'typescript-json-serializer';

import { Preview } from './preview';
import { Narrative } from './narrative';
import { Quest } from './quest';
import { Solution } from './solution';
import { GameElement } from './gameElement';

@Serializable()
export class ChaseMetaData {
  @JsonProperty() id?: string;
  @JsonProperty() version?: number;
  @JsonProperty() title: string;
  @JsonProperty() description: string;
  @JsonProperty() preview: Preview;
  @JsonProperty() author: string; //Author;
  @JsonProperty() lastEdited: Date;
  @JsonProperty() creationDate: Date;
  @JsonProperty() comment?: string;
}

@Serializable()
export class ChaseList {
  @JsonProperty({ type: ChaseMetaData }) chases: Array<ChaseMetaData>;

  constructor() {
    this.chases = new Array<ChaseMetaData>();
  }
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
        gameElements.set(+v, deserialize<Narrative>(value._narratives[v], Narrative));
      }
      for (const v in value._quests) {
        console.log('add ' + v + ' as Quest');
        gameElements.set(+v, deserialize<Quest>(value._quests[v], Quest));
      }
      for (const v in value._solutions) {
        console.log('add ' + v + ' as solution');
        gameElements.set(+v, deserialize<Solution>(value._solutions[v], Solution));
      }
      console.log("number of GameElements: ", gameElements.size);
      return gameElements;
    },
    onSerialize: value => {
      console.log('serialize gameElement');
      const narratives = new Object();
      const quests = new Object();
      const solutions = new Object();
      for (const element of value.keys()) {
        if (value.get(element) instanceof Narrative) {
          console.log('serialize narrative');
          narratives[element] = serialize(value.get(element));
        } else if (value.get(element) instanceof Quest) {
          console.log('serialize quest');
          quests[element] = serialize(value.get(element));
        } else if (value.get(element) instanceof Solution) {
          console.log('serialize solution');
          solutions[element] = serialize(value.get(element));
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
    return this.gameElements.get(destination);
  }

}
