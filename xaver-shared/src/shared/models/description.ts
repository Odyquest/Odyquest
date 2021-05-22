import {JsonProperty, Serializable} from 'typescript-json-serializer';

/**
 * Encapsulates a typical description element.
 *
 * It could be either a narration, quest or help text or some other description text.
 */
@Serializable()
export class Description {
  @JsonProperty('text') text = "";
  @JsonProperty('image') image = "";
}
