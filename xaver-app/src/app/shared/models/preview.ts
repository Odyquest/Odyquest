import { Serializable, JsonProperty } from 'typescript-json-serializer';

@Serializable()
export class Preview {
	@JsonProperty() description: string;
}
