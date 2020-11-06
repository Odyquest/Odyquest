import { Solution } from "./solution";

export class RequirementCombination {

  solutionItems: Array<string>;
  combinationMap: Array<Solution>;

  getSolution(solutions: Array<string>): number | undefined {
    const solutionArray = new Array<boolean>(this.solutionItems.length);
    for (let i = 0; i < this.solutionItems.length; i++) {
      solutionArray[i] = false;
    }


    for (const given of solutions) {
      const i = this.solutionItems.indexOf(given);
      if (i < this.solutionItems.length) {
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
      // TODO use logicType
      // match any
      // const fullfilled = combination.requiredItems.map(matchAny);
      // if (fullfilled.some(isTrue)) {
      //   console.log('Given solution is valid.');
      //   return this.combinationMap.indexOf(combination);
      // }
      // match all
      const fullfilled = combination.requiredItems.map(matchAll);
      if (fullfilled.every(isTrue)) {
        console.log('Given solution is valid.');
        return this.combinationMap.indexOf(combination);
      }
    }
    console.log('Given solution is not valid.');
    return; // no valid solution
  }

}
