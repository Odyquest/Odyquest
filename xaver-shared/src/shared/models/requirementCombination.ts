import { Serializable, JsonProperty } from 'typescript-json-serializer';
import { LogicType, SolutionTerm } from './solution_term';

/**
 * Represents all expected Solutions of a Quest
 */
@Serializable()
export class RequirementCombination {

  /** names of the solution items */
  @JsonProperty() solutionItems: Array<string> = ["Neue Lösung"];
  /** combination of solution items which leads to a new game element */
  @JsonProperty({ type: SolutionTerm, }) combinationMap: Array<SolutionTerm> = [new SolutionTerm];

  /**
   * Takes a possible solution and verifies it.
   *
   * @return the solution term corresponds to the given solution of 'undefined' if the given solution has no corresponding solution term
   */
  getSolution(solutions: Array<string>): SolutionTerm | undefined {
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

    const matchAny = function(value: boolean, index: number): boolean {
      return value === solutionArray[index] && value === true;
    };
    const matchAll = function(value: boolean, index: number): boolean {
      return value === solutionArray[index];
    };
    const isTrue = function(value:boolean): boolean {
      return value === true;
    }
    for (const combination of this.combinationMap) {
      if (combination.logicType === LogicType.Or) {
        const fullfilled = combination.requiredItems.map(matchAny);
        if (fullfilled.some(isTrue)) {
          console.log('Given solution is valid.');
          return combination;
        }
      } else if (combination.logicType === LogicType.And) {
        const fullfilled = combination.requiredItems.map(matchAll);
        if (fullfilled.every(isTrue)) {
          console.log('Given solution is valid.');
          return combination;
        }
      }
    }
    console.log('Given solution is not valid.');
    return undefined;
  }

  getPossibleDestinations(): Array<number> {
    const destinations = new Array<number>();
    for (const combination of this.combinationMap) {
      if (destinations.indexOf(combination.destination) == -1) {
        destinations.push(combination.destination);
      }
    }
    return destinations;
  }
}
