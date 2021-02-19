import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { Description } from './description';

@Serializable()
export class ExecutionTarget {
	@JsonProperty() url: string;
	@JsonProperty() data: string;
}

/**
 * Base class for views displayed by the app.
 */
@Serializable()
export class GameElement {
	@JsonProperty() id?: number;
	@JsonProperty() version?: number;
	@JsonProperty() title: string;
	@JsonProperty() description = new Description();
	@JsonProperty({ type: Description }) help: Array<Description>;

	/** Url to external presenter of this element like Xaver
	 * if variable is defined, the given presenter will be used
	 * if it is undefined, use the app for display
	 */
  @JsonProperty() executionTarget: ExecutionTarget|undefined;
}
