import { Serializable, JsonProperty } from 'typescript-json-serializer';

@Serializable()
export class Description {
	@JsonProperty('text') text: string;
	@JsonProperty('image') image: string;
}
