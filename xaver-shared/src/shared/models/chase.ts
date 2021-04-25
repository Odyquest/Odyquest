import { deserialize, serialize, Serializable, JsonProperty } from 'typescript-json-serializer';

import { Preview } from './preview';
import { Narrative } from './narrative';
import { Quest } from './quest';
import { GameElement } from './gameElement';

@Serializable()
export class ChaseMetaData {
  @JsonProperty() chaseId?: string;
  @JsonProperty() version?: number;
  @JsonProperty() title: string = '';
  @JsonProperty() description: string = '';
  @JsonProperty() preview: Preview = new Preview();
  @JsonProperty() author?: string; //Author;
  @JsonProperty() lastEdited?: Date;
  @JsonProperty() creationDate?: Date;
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
  @JsonProperty() metaData: ChaseMetaData = new ChaseMetaData();
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
      const narratives: {[index: number]:any} = new Object();
      const quests: {[index: number]:any} = new Object();
      for (const element of value.keys()) {
        if (value.get(element) instanceof Narrative) {
          console.log('serialize narrative');
          narratives[element] = serialize(value.get(element));
        } else if (value.get(element) instanceof Quest) {
          console.log('serialize quest');
          quests[element] = serialize(value.get(element));
        } else {
          console.log('can not serialize game element of unknown type');
        }
      }
      return {
        _narratives: narratives,
        _quests: quests
      };
    }
  }) gameElements: Map<number, GameElement> = new Map<number, GameElement>();
  @JsonProperty() initialGameElement: number = -1; // GameElementID
  @JsonProperty() tags?: Array<string>;

  copyFromChase(chase: Chase) {
        this.metaData = chase.metaData;
        this.initialGameElement = chase.initialGameElement;
        this.gameElements = chase.gameElements;
        if (chase.tags) {
          this.tags = chase.tags;
        }
  }
  copyToChase(chase: Chase) {
        chase.metaData = this.metaData;
        chase.initialGameElement = this.initialGameElement;
        chase.gameElements = this.gameElements;
        if (this.tags) {
          chase.tags = this.tags;
        }
  }

  getElement(destination: number): GameElement | undefined {
    return this.gameElements.get(destination);
  }

}
