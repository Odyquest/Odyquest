import { Chase, ChaseMetaData } from '../chase';
import { Description } from '../description';
import { GameElement } from '../gameElement';
import { Narrative } from '../narrative';
import { Quest, QuestType } from '../quest';
import { Preview } from '../preview';
import { RequirementCombination } from '../requirementCombination';
import { LogicType, SolutionTerm } from '../solution_term';
import { XButton } from '../xButton';
import { base64_encoded_image } from './imageExample';

export function getSimpleExample(): Chase {
  const chase = new Chase();
  const metaData = new ChaseMetaData();
  metaData.chase_id = 'simple_id';
  metaData.title = 'This is an example chase!';
  metaData.description = 'This chase has no content';
  metaData.preview = new Preview()
  metaData.preview.description = new Description()
  metaData.preview.description.text = 'This chase has no content';
  chase.metaData = metaData;
  chase.gameElements = new Map<number, GameElement>();

  const narrative = new Narrative();
  narrative.title = 'Error occured!';
  narrative.description = new Description();
  narrative.description.text = 'If you can see this, something went wrong.';
  narrative.description.image = 'https://upload.wikimedia.org/wikipedia/en/b/b4/Hitchhikers_Guide_TV_Titles.jpg';
  const forward = new XButton();
  forward.name = 'stay';
  forward.destination = 0;
  narrative.buttons = new Array<XButton>();
  narrative.buttons.push(forward);
  chase.gameElements.set(0,narrative);
  chase.initialGameElement = 0;

  return chase;
}
