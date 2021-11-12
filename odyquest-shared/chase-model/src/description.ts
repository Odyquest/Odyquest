import {JsonProperty, Serializable} from 'typescript-json-serializer';

/**
 * Encapsulates a typical description element.
 *
 * It could be either a narration, quest or help text or some other description text.
 */
@Serializable()
export class Description {
  /**
   * Description text
   */
  @JsonProperty('text') text = "";
  /**
   * Url to an image or base64 encoded image
   */
  @JsonProperty('image') image = "";

  /**
   * List of available image resolutions. If list is empty, there is only the original image.
   *
   * Using an explizit list of resolutions makes it backward compatible and allows adding new resolutions.
   * And creating those downscaled images can depend on the size of the original image.
   */
  @JsonProperty() image_res: Array<number> = new Array<number>();
}
