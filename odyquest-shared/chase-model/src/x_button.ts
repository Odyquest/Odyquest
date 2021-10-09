import { Serializable, JsonProperty } from 'typescript-json-serializer';

/**
 * A button pointing to a following game element
 */
@Serializable()
export class XButton {
	/** Display text of the button */
	@JsonProperty() name: string = '';
	/** Id of the game element the button points to or -1 if no valid destination is given. */
	@JsonProperty() destination: number = -1; // GameElementID
}
