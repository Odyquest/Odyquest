import { deserialize, serialize, Serializable, JsonProperty } from 'typescript-json-serializer';

import { Description } from './description';
import { Narrative } from './narrative';
import { Quest } from './quest';
import { GameElement } from './game_element';
import { Media, Audio, AugmentedReality, Image, Video } from './media';

/**
 * JsonProperty setting for converting media map
 */
const convertMediaList = {
  names: ['_images', '_audios', '_videos', '_augmented_reality'],
  isDictionary: true,
  /** Merge specialized maps together to original map */
  onDeserialize: (value: any) => {
    const medias = new Map<string, Media>();
    for (const v in value._images) {
      medias.set(v, deserialize<Image>(value._images[v], Image));
    }
    const audios = new Map<string, Audio>();
    for (const v in value._audios) {
      medias.set(v, deserialize<Audio>(value._audios[v], Audio));
    }
    const videos = new Map<string, Video>();
    for (const v in value._videos) {
      medias.set(v, deserialize<Video>(value._videos[v], Video));
    }
    const augmentedRealitys = new Map<string, AugmentedReality>();
    for (const v in value._augmented_reality) {
      medias.set(v, deserialize<AugmentedReality>(value._augmented_reality[v], AugmentedReality));
    }
    return medias;
  },
  /**
   * Split up images for serialization to keep type safety 
   */
  onSerialize: (value: any) => {
    const images: {[index: number]:any} = new Object();
    const audios: {[index: number]:any} = new Object();
    const videos: {[index: number]:any} = new Object();
    const ars: {[index: number]:any} = new Object();
    for (const element of value.keys()) {
      if (value.get(element) instanceof Image) {
        images[element] = serialize(value.get(element));
      } else if (value.get(element) instanceof Audio) {
        audios[element] = serialize(value.get(element));
      } else if (value.get(element) instanceof Video) {
        videos[element] = serialize(value.get(element));
      } else if (value.get(element) instanceof AugmentedReality) {
        ars[element] = serialize(value.get(element));
      } else {
        console.warn('can not serialize media of unknown type');
      }
    }
    return {
      _images: images,
      _audios: audios,
      _videos: videos,
      _augmented_reality: ars
    };
  }
}

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

  @JsonProperty() preview: Description = new Description();
  @JsonProperty() author: Description = new Description();
  @JsonProperty() editing?: ChaseEditingData;
}

@Serializable()
export class ChaseSummary {
  @JsonProperty() metaData: ChaseMetaData = new ChaseMetaData();

  @JsonProperty(convertMediaList) media: Map<string, Media> = new Map<string, Media>();
}

/**
 * Encapsulates a list of chase meta data for easier serialization and deserialization
 */
@Serializable()
export class ChaseList {
  @JsonProperty({ type: ChaseSummary }) chases: Array<ChaseSummary> = new Array<ChaseSummary>();
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

  @JsonProperty(convertMediaList) media: Map<string, Media> = new Map<string, Media>();

  @JsonProperty() tags?: Array<string>;

  /**
   * Copy the chase attributes from a given chase to this chase
   */
  copyFromChase(chase: Chase) {
        this.metaData = chase.metaData;
        this.initialGameElement = chase.initialGameElement;
        this.gameElements = chase.gameElements;
        this.media = chase.media;
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
        chase.media = this.media;
        if (this.tags) {
          chase.tags = this.tags;
        }
  }

  /** Get the game element with the given id */
  getElement(destination: number): GameElement | undefined {
    return this.gameElements.get(destination);
  }

  /** Get media with the given id */
  getMedia<T extends Media>(id: string): T | undefined {
    return this.media.get(id) as T;
  }

}
