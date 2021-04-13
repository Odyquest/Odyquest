import { Serializable, JsonProperty } from 'typescript-json-serializer';

@Serializable()
export class XButton {
	@JsonProperty() name: string = '';
	@JsonProperty() destination: number = -1; // GameElementID
}
