import { Serializable, JsonProperty } from 'typescript-json-serializer';

import { Description } from './description';
import { GameElement } from './gameElement';

@Serializable()
export class Solution extends GameElement {

	@JsonProperty() destination: number; // GameElementId
}
