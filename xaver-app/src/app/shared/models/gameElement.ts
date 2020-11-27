import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { Description } from './description';

@Serializable()
export class GameElement {
	@JsonProperty() id?: number;
	@JsonProperty() version?: number;
	@JsonProperty() title: string;
	@JsonProperty() description: Description;
}
