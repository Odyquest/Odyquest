import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { NarrativeType } from './narrative_type';

@Serializable()
class MediaFile {
  @JsonProperty() url;

  constructor(url: string) {
    this.url = url;
  }
}

@Serializable()
export class Media {
  @JsonProperty() id = "";
  /**
   * Alternative text to media.
   */
  @JsonProperty() alternativeText = "";
}

@Serializable()
export class MediaWithFilelist<T> extends Media {
  @JsonProperty() files = new Array<T>();
  @JsonProperty() defaultIndex: number | undefined;

  public hasFiles(): boolean {
    return this.files.length !== 0;
  }
}

@Serializable()
export class ImageFile extends MediaFile {
  @JsonProperty() width: number;

  constructor(url = "", width = 0) {
    super(url);
    this.width = width;
  }

}

@Serializable()
export class Image extends MediaWithFilelist<ImageFile> {
  @JsonProperty() preview = "";

  public getFilesSortedByResolution(): ImageFile[] {
    return this.files.sort((first, second) => 0 - (first.width > second.width ? -1 : 1));

  }
}

@Serializable()
export class AudioFile extends MediaFile {
  @JsonProperty() mimetype:string;
  @JsonProperty() bitrate:number;

  constructor(url: string, mimetype: string, bitrate: number) {
    super(url);
    this.mimetype = mimetype;
    this.bitrate = bitrate;
  }
}

@Serializable()
export class Audio extends MediaWithFilelist<AudioFile> {
}

@Serializable()
export class VideoFile extends MediaFile {
  @JsonProperty() mimetype:string;
  @JsonProperty() resolution:number;

  constructor(url: string, mimetype: string, resolution: number) {
    super(url);
    this.mimetype = mimetype;
    this.resolution = resolution;
  }
}

@Serializable()
export class Video extends MediaWithFilelist<VideoFile> {
}

@Serializable()
export class AugmentedReality extends Media {
}

/**
 * Encapsulates media element.
 *
 * Should contain only one element, but this is not a requirement.
 */
@Serializable()
export class MediaCollection {
  @JsonProperty() audio?: Audio;
  @JsonProperty() video?: Video;
  @JsonProperty() augmentedReality?: AugmentedReality;

  getMedia(type: NarrativeType): Media {
    switch(type) {
      case NarrativeType.Audio:
        if (!this.audio) {
          this.audio = new Audio();
        }
        return this.audio;
      case NarrativeType.Video:
        if (!this.video) {
          this.video = new Video();
        }
        return this.video;
      case NarrativeType.AugmentedReality:
        if (!this.augmentedReality) {
          this.augmentedReality = new AugmentedReality();
        }
        return this.augmentedReality;
      default:
        // TODO throw error
        return new Audio();
    }
  }

  setMedia(type: NarrativeType, media: Media): void {
    switch(type) {
      case NarrativeType.Audio:
        this.audio = media as Audio;
        break;
      case NarrativeType.Video:
        this.video = media as Video;
        break;
      case NarrativeType.AugmentedReality:
        this.augmentedReality = media as AugmentedReality;
        break;
    }
  }
}

