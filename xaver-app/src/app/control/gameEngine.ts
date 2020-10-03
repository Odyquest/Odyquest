import { Chase } from '../model/chase';
import { GameElement } from '../model/gameElement';
import { getExample } from '../model/example/chaseExample';

export class GameEngine {
  title: string;
  progress: string;
  quests: Array<string>;
  chase: Chase;
  testingCounter = 0;

  constructor() {
    console.log('create example data');
    this.chase = getExample();
    console.log(this.chase);
  }

  get_next_element(button: string): GameElement {
    // TODO implement

    this.testingCounter = this.testingCounter + 1;
    if (this.testingCounter === 1) {
      console.log('get_next_element(); return ' + this.chase.gameElements[0].title + ' (counter is ' + this.testingCounter + ')');
      return this.chase.gameElements[0];
    } else if (this.testingCounter === 2) {
      console.log('get_next_element(); return ' + this.chase.gameElements[1].title + ' (counter is ' + this.testingCounter + ')');
      return this.chase.gameElements[1];
    } else if (this.testingCounter === 3) {
      // TODO select solution
      console.log('get_next_element(); return ' +
        this.chase.gameElements[1].requirementCombination.combinationMap[0].title + ' (counter is ' + this.testingCounter + ')');
      return this.chase.gameElements[1].requirementCombination.combinationMap[0];
    } else if (this.testingCounter === 4) {
      console.log('get_next_element(); reached last element, start again');
      this.testingCounter = 0;
      return this.get_next_element('start again');
    } else {
      console.log('get_next_element(); I do not know what to return, start at the beginning (counter is ' + this.testingCounter + ')');
      this.testingCounter = 0;
      return this.get_next_element('start again');
    }
  }

}

