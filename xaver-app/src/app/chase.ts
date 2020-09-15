export class Chase {
  title: string;
  progress: string;

  /** creates object from json */
  from_json(json): void {
  }

  get_next(): ChaseElement {
    // TODO implement
    return Description;
  }

}

export class ChaseElement {
  // TODO type
}

export class Description extends ChaseElement {
  title: string;
  text: string;
  image: string;
}

export interface Task extends ChaseElement {
  title: string;
  text: string;
  image: string;
}

export interface Solution extends ChaseElement {
  title: string;
  type: string;
  submitted: string;
}
