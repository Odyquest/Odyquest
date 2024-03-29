import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { NarrativeType } from './narrative_type';

@Serializable()
export class MediaFile {
  /**
   * The filename is either the name of the file in the backend, an url or a relative path to a static file starting
   * with './'
   */
  @JsonProperty() filename: string;

  constructor(filename: string) {
    this.filename = filename;
  }
}

@Serializable()
export abstract class Media {
  /**
   * Global unique identifier
   */
  @JsonProperty() mediaId?: string;
  /**
   * Id of corresponding chase
   *
   * Only necessary when handling outside of a chase object.
   */
  @JsonProperty() chaseId = "";
  /**
   * Alternative text to media.
   *
   * Describing the content of the media in text e.g. for blind persons.
   */
  @JsonProperty() alternative = "";
  @JsonProperty() annotation? = "";

  public abstract hasFiles(): boolean;
  public abstract getDefaultFile(): MediaFile;
  public abstract getUrlByIndex(backendPrefix: string, index: number): string;
  public abstract getDefaultUrl(backendPrefix: string): string;
  /**
   * If the returned url does not start with 'https://' or './', the base url for loading files from backend has to be
   * prefixed.
   */
  public getUrlByName(backendPrefix: string, filename: string): string {
    if (filename.indexOf('http') === 0 || filename.indexOf('./') === 0) {
      return filename;
    } else {
      return backendPrefix + this.chaseId + '/' + this.mediaId + '/' + filename;
    }
  }
}

@Serializable()
export class MediaWithFilelist<T extends MediaFile> extends Media {
  @JsonProperty() files = new Array<T>();
  @JsonProperty() defaultIndex: number | undefined;

  public hasFiles(): boolean {
    return this.files.length !== 0;
  }

  public getDefaultFile(): T {
    if (this.defaultIndex) {
      return this.files[this.defaultIndex];
    } else {
      return this.files[0];
    }
  }

  public getUrlByIndex(backendPrefix: string, index: number): string {
    if (!this.files[index] || !this.files[index].filename) {
      return '';
    }
    return this.getUrlByName(backendPrefix, this.files[index].filename);
  };
  public getDefaultUrl(backendPrefix: string): string {
    return this.getUrlByIndex(backendPrefix, this.defaultIndex || 0);
  }
}

@Serializable()
export class ImageFile extends MediaFile {
  @JsonProperty() width: number;

  constructor(filename = "", width = 0) {
    super(filename);
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

  constructor(filename: string, mimetype: string, bitrate: number) {
    super(filename);
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

  constructor(filename: string, mimetype: string, resolution: number) {
    super(filename);
    this.mimetype = mimetype;
    this.resolution = resolution;
  }
}

@Serializable()
export class Video extends MediaWithFilelist<VideoFile> {
}

@Serializable()
export class AugmentedReality extends MediaWithFilelist<MediaFile> {
  baseUrl = '';
}

