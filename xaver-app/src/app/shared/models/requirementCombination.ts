import { Serializable, JsonProperty } from 'typescript-json-serializer';

import { LogicType, Solution } from "./solution";

@Serializable()
export class RequirementCombination {

  @JsonProperty() solutionItems: Array<string>;
  @JsonProperty({ type: Solution, }) combinationMap: Array<Solution>;

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
