import { Image } from './media';

import { Serializable, JsonProperty } from 'typescript-json-serializer';

@Serializable()
export class Preview {
  @JsonProperty() text = "";
  @JsonProperty() image = new Image();
}
