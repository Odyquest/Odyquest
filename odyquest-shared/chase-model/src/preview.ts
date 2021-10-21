import { Description } from './description';

import { Serializable, JsonProperty } from 'typescript-json-serializer';

@Serializable()
export class Preview {
	@JsonProperty() description: Description = new Description();
}
