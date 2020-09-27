import { Chase } from '../model/chase';
import { Description } from '../model/description';
import { Narrative } from '../model/narrative';
import { Quest } from '../model/quest';
import { RequirementCombination } from '../model/requirementCombination';
import { Solution } from '../model/solution';
import { XButton } from '../model/xButton';

export function getExample(): Chase {
  const chase = new Chase();
  chase.title = 'This is a chase to the galaxy';
  chase.description = 'Description of the galaxy chase!';

  const narrative = new Narrative();
  narrative.title = 'Hitchhiking to the galaxy';
  narrative.description = new Description();
  narrative.description.text = 'You have the opportunity to travel though the galaxy. According to your guide the spaceship Heart of Gold is enabled with an Infinite Improbability Drive. Your guide also tells you "Don\'t panic"!';
  const forward = new XButton();
  forward.name = 'Enter the Heart of Gold';
  forward.destination = 1;
  narrative.buttons.push(forward);
  chase.gameElements.set(0, narrative);
  chase.initialGameElement = 0;

  const quest = new Quest();
  quest.title = 'The Ultimate Question';
  quest.description = new Description();
  quest.description.text = 'What is the answer to the Ultimate Question to Life, the Universe, and Everything?';
  // quest.type = something like Multiple Choice
  // quest.maxTrys = 7;
  // quest.maxTime = something like 42 minutes
  const combination = new RequirementCombination();
  combination.solutionItems = ['three', 'fortytwo'];
  const right = new Solution();
  right.requiredItems = [false, true];
  // logicType = whatever
  right.description = new Description();
  right.description.text = 'You are right, according to Deep Thought it is 42!';
  right.destination = 2;
  chase.gameElements.set(1, quest);

  return chase
}
