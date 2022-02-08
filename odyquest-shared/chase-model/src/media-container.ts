import { deserialize, serialize, Serializable, JsonProperty } from 'typescript-json-serializer';
import { Audio, AugmentedReality, Image, Video, Media } from './media';

/**
 * helper class for proper serialization
 */
class MediaData {
  data: Media;
  constructor(data: Media) {
    this.data = data;
  }

  public set(data: Media): void {
    this.data = data;
  }
  public get(): Media {
    return this.data;
  }
};

/** 
 * Container to serialize Media keeping inherited type.
 */
export class MediaContainer {
  @JsonProperty({
    names: ['_image', '_audio', '_video', '_augmented_reality', '_unknown'],
    onDeserialize: value => {
      let media: Media;
      if (value._image) {
        media = deserialize<Image>(value._image.data, Image);
      } else if (value._audio) {
        media = deserialize<Audio>(value._audio.data, Audio);
      } else if (value._video) {
        media = deserialize<Video>(value._video.data, Video);
      } else if (value._augmented_reality) {
        media = deserialize<AugmentedReality>(value._augmented_reality.data, AugmentedReality);
      } else {
        console.error('Can not deserialize MediaContainer, unknown medie type: ', value);
        media = new Image();
      }
      return new MediaData(media);
    },
    onSerialize: value => {
        if (value.get() instanceof Image) {
          return { _image: serialize(value) };
        } else if (value.get() instanceof Audio) {
          return { _audio: serialize(value) };
        } else if (value.get() instanceof Video) {
          return { _video: serialize(value) };
        } else if (value.get() instanceof AugmentedReality) {
          return { _augmented_reality: serialize(value) };
        } else {
          console.error('can not serialize MediaContainer with media of unknown type', value);
          return { _unknown: serialize(value) };
        }
      }
  }) data: MediaData;

  constructor(data: Media) {
    this.data = new MediaData(data);
  }

  public get(): Media {
    return this.data.get();
  }
};
