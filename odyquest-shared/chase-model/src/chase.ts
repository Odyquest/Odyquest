import { deserialize, serialize, Serializable, JsonProperty } from 'typescript-json-serializer';

import { Preview } from './preview';
import { Narrative } from './narrative';
import { Quest } from './quest';
import { GameElement } from './game_element';
import { Image } from './media';

@Serializable()
export class ChaseEditingData {
  @JsonProperty() creationDate?: Date;
  @JsonProperty() publicationDate?: Date;
  @JsonProperty() lastEdition?: Date;
  @JsonProperty() comments?: string;
}

/**
 * Containing the meta data of a chase
 *
 * All data which are may be interesting for displaying a list of chases or filtering
 */
@Serializable()
export class ChaseMetaData {
  @JsonProperty() chaseId?: string;
  @JsonProperty() published: boolean = false;
  @JsonProperty() version?: number;
  @JsonProperty() title: string = '';

  @JsonProperty() preview: Preview = new Preview();
  @JsonProperty() author?: string;
  @JsonProperty() editing?: ChaseEditingData;
}

/**
 * Encapsulates a list of chase meta data for easier serialization and deserialization
 */
@Serializable()
export class ChaseList {
  @JsonProperty({ type: ChaseMetaData }) chases: Array<ChaseMetaData>;

  constructor() {
    this.chases = new Array<ChaseMetaData>();
  }
}

/**
 * Actual implementation of a chase which represents a treasure hunt or escape game
 */
@Serializable()
export class Chase {
  @JsonProperty() metaData: ChaseMetaData = new ChaseMetaData();
  /** A chase is a collection of game elements.
   * Each game element is a specialized implementation of GameElement and can be addressed by the key in the map.
   */
  @JsonProperty({
    names: ['_narratives', '_quests'],
    isDictionary: true,
    /** Merge specialized maps together to original map */
    onDeserialize: value => {
      const gameElements = new Map<number, GameElement>();
      for (const v in value._narratives) {
        gameElements.set(+v, deserialize<Narrative>(value._narratives[v], Narrative));
      }
      for (const v in value._quests) {
        gameElements.set(+v, deserialize<Quest>(value._quests[v], Quest));
      }
      return gameElements;
    },
    /** Split up gameElements for serialization to keep type safety */
    onSerialize: value => {
      const narratives: {[index: number]:any} = new Object();
      const quests: {[index: number]:any} = new Object();
      for (const element of value.keys()) {
        if (value.get(element) instanceof Narrative) {
          narratives[element] = serialize(value.get(element));
        } else if (value.get(element) instanceof Quest) {
          quests[element] = serialize(value.get(element));
        } else {
          console.warn('can not serialize game element of unknown type');
        }
      }
      return {
        _narratives: narratives,
        _quests: quests
      };
    }
  }) gameElements: Map<number, GameElement> = new Map<number, GameElement>();
  /** Index of first element in gameElements to start the chase with */
  @JsonProperty() initialGameElement: number = -1; // GameElementID

  @JsonProperty({
    names: ['_images'],
    isDictionary: true,
    /** Merge specialized maps together to original map */
    onDeserialize: value => {
      console.log("deserialize images");
      const images = new Map<string, Image>();
      for (const v in value._images) {
        images.set(v, deserialize<Image>(value._images[v], Image));
        // console.log('deserialize image with id ', images.get(v));
      }
      return images;
    },
    /** Split up images for serialization to keep type safety */
    onSerialize: value => {
      console.log("serialize images");
      const images: {[index: number]:any} = new Object();
      for (const element of value.keys()) {
        if (value.get(element) instanceof Image) {
          images[element] = serialize(value.get(element));
          // console.log('serialize image with id ', images[element].id);
        } else {
          console.warn('can not serialize image of unknown type');
        }
      }
      return {
        _images: images
      };
    }
  }) images: Map<string, Image> = new Map<string, Image>();

  @JsonProperty() tags?: Array<string>;

  /**
   * Copy the chase attributes from a given chase to this chase
   */
  copyFromChase(chase: Chase) {
        this.metaData = chase.metaData;
        this.initialGameElement = chase.initialGameElement;
        this.gameElements = chase.gameElements;
        this.images = chase.images;
        if (chase.tags) {
          this.tags = chase.tags;
        }
  }

  /**
   * Copy the chase attributes from this chase to a given chase.
   */
  copyToChase(chase: Chase) {
        chase.metaData = this.metaData;
        chase.initialGameElement = this.initialGameElement;
        chase.gameElements = this.gameElements;
        chase.images = this.images;
        if (this.tags) {
          chase.tags = this.tags;
        }
  }

  /** Get the game element with the given id */
  getElement(destination: number): GameElement | undefined {
    return this.gameElements.get(destination);
  }

  /** Get the image with the given id */
  getImage(id: string): Image | undefined {
    return this.images.get(id) as Image;
  }

}
