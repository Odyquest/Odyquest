import { deserialize, Serializable, JsonProperty } from 'typescript-json-serializer';

import { Preview } from './preview';
import { Narrative } from './narrative';
import { Quest } from './quest';
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
    names: ['_narratives', '_quests'],
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
      console.log("number of GameElements: ", gameElements.size);
      return gameElements;
    },
    onSerialize: value => {
      console.log('serialize gameElement');
      const narratives = new Map<number, Narrative>();
      const quests = new Map<number, Narrative>();
      for (const element in value) {
        if (value[element].buttons) {
          console.log('serialize narrative');
          narratives.set(+element, value[element]);
        } else if (value[element].questType) {
          console.log('serialize quest');
          quests.set(+element, value[element]);
        }
      }
      return {
        _narratives: narratives,
        _quests: quests
      };
    }
  }) gameElements: Map<number, GameElement>;
  @JsonProperty() initialGameElement: number; // GameElementID
  @JsonProperty() tags?: Array<string>;

  getElement(destination: number): GameElement {
    return this.gameElements[destination];
  }

}
