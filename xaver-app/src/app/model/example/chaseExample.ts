import { Chase } from '../chase';
import { Description } from '../description';
import { GameElement } from '../gameElement';
import { Narrative } from '../narrative';
import { Quest, QuestType } from '../quest';
import { RequirementCombination } from '../requirementCombination';
import { Solution } from '../solution';
import { XButton } from '../xButton';

export function getExample(): Chase {
  const chase = new Chase();
  chase.title = 'This is a chase to the galaxy';
  chase.description = 'Description of the galaxy chase!';
  chase.gameElements = new Map<number, GameElement>();

  const narrative = new Narrative();
  narrative.title = 'Hitchhiking to the galaxy';
  narrative.description = new Description();
  narrative.description.text = 'You have the opportunity to travel though the galaxy. According to your guide the spaceship Heart of Gold is enabled with an Infinite Improbability Drive. Your guide also tells you "Don\'t panic"!';
  const forward = new XButton();
  forward.name = 'Enter the Heart of Gold';
  forward.destination = 1;
  narrative.buttons = new Array<XButton>();
  narrative.buttons.push(forward);
  chase.gameElements[0] = narrative;
  chase.initialGameElement = 0;

  const quest = new Quest();
  quest.title = 'The Ultimate Question';
  quest.description = new Description();
  quest.description.text = 'What is the answer to the Ultimate Question to Life, the Universe, and Everything?';
  quest.questType = QuestType.MultipleChoice;
  // quest.maxTrys = 7;
  // quest.maxTime = something like 42 minutes
  const combination = new RequirementCombination();
  combination.solutionItems = ['three', 'fortytwo'];
  const right = new Solution();
  right.requiredItems = [false, true];
  // logicType = whatever
  right.description = new Description();
  right.description.text = 'You are right, according to Deep Thought it is 42!';
  right.destination = 0;
  const wrong = new Solution();
  wrong.requiredItems = [true, false];
  // logicType = whatever
  wrong.description = new Description();
  wrong.description.text = 'You loose!';
  wrong.destination = 1;
  combination.combinationMap = [right, wrong];
  quest.requirementCombination = combination;

  chase.gameElements[1] = quest;

  return chase;
}
