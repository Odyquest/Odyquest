import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { GameElement } from './gameElement';
import { XButton } from './xButton';

/**
 * Display type of the narrative element
 *
 * Caution: Not all types are fully implemented yet.
 */
export enum NarrativeType {
  Text = 'text',
  Audio = 'audio',
  Panorama = 'panorama',
  Video = 'video',
}

/**
 * Status of a narrative element
 *
 * Does the chase continue or is it the final element. Does the chase finish in a winning or loosing branch.
 */
export enum NarrativeStatus {
  Continue = 'continue',
  Win = 'win',
  Loose = 'loose'
}

/**
 * A game element telling a story
 *
 * It has different buttons for different branches continuing the story
 * or the status marks it as final element in the chase.
 */
@Serializable()
export class Narrative extends GameElement {

	/** Buttons for next steps if game continues */
	@JsonProperty() buttons = Array<XButton>();
	/** How to display the current narrative */
	@JsonProperty() narrativeType = NarrativeType.Text;
	/** Game continues or is finished */
	@JsonProperty() narrativeStatus = NarrativeStatus.Continue;

  copyFromNarrative(narrative:Narrative) {
    this.copyFromGameElement(narrative);
    this.buttons = narrative.buttons;
    this.narrativeType = narrative.narrativeType;
    this.narrativeStatus = narrative.narrativeStatus;
  }

  /**
   * Whether the game element is the final one (true)
   * or the chase will be continued by an other game element (false).
   */
  isFinal(): boolean {
    return this.narrativeStatus !== NarrativeStatus.Continue;
  }
}
