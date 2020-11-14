import { LogicType, Solution } from './solution';

export class RequirementCombination {

  solutionItems: Array<string>;
  combinationMap: Array<Solution>;

  getSolution(solutions: Array<string>): number | undefined {
    const solutionArray = new Array<boolean>(this.solutionItems.length);
    const expectedItems = new Array<string>(this.solutionItems.length);
    for (let i = 0; i < this.solutionItems.length; i++) {
      // prepare solution items
      expectedItems[i] = this.solutionItems[i].trim().toLowerCase();
      // create comparison entry
      solutionArray[i] = false;
    }

    for (const given of solutions) {
      const i = expectedItems.indexOf(given.trim().toLowerCase());
      if (i < expectedItems.length) {
        solutionArray[i] = true;
      }
    }

    const matchAny = function(value, index): boolean {
      return value === solutionArray[index] && value === true;
    };
    const matchAll = function(value, index): boolean {
      return value === solutionArray[index];
    };
    const isTrue = function(value): boolean {
      return value === true;
    }
    for (const combination of this.combinationMap) {
      if (combination.logicType === LogicType.Or) {
        const fullfilled = combination.requiredItems.map(matchAny);
        if (fullfilled.some(isTrue)) {
          console.log('Given solution is valid.');
          return this.combinationMap.indexOf(combination);
        }
      } else if (combination.logicType === LogicType.And) {
        const fullfilled = combination.requiredItems.map(matchAll);
        if (fullfilled.every(isTrue)) {
          console.log('Given solution is valid.');
          return this.combinationMap.indexOf(combination);
        }
      }
    }
    console.log('Given solution is not valid.');
    return; // no valid solution
  }

}
