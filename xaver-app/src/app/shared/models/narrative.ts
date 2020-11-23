import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { GameElement } from './gameElement';
import { XButton } from './xButton';

export enum NarrativeStatus {
  Continue = 'continue',
  Win = 'win',
  Loose = 'loose'
}

@Serializable()
export class Narrative extends GameElement {

	/** Buttons for next steps if game continues */
	@JsonProperty() buttons: Array<XButton>;
	/** Game continues of is finished */
	@JsonProperty() narrativeStatus = NarrativeStatus.Continue;

  isFinal(): boolean {
    return this.narrativeStatus !== NarrativeStatus.Continue;
  }
}
