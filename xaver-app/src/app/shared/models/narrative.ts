import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { GameElement } from './gameElement';
import { XButton } from './xButton';

@Serializable()
export class Narrative extends GameElement {

	@JsonProperty() buttons: Array<XButton>;

  // TODO handle final win/loose

}
