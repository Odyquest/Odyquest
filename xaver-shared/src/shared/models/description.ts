import {JsonProperty, Serializable} from 'typescript-json-serializer';

@Serializable()
export class Description {
  @JsonProperty('text') text = "";
  @JsonProperty('image') image = "";
}
