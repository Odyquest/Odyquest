export class Chase {
  title: string;
  progress: string;
  testingCounter = 0;

  /** creates object from json */
  from_json(json): void {
  }

  get_next(button: string): ChaseElement {
    // TODO implement
    const first = new Description();
    first.title = 'Description one';
    first.text = 'Text of description';
    const second = new Description();
    second.title = 'Description two';
    second.text = 'Text of description';
    const third = new Task();
    third.title = 'Description one';
    third.text = 'Text of description';
    const four = new Solution();
    four.title = 'Description one';
    four.text = 'Text of description';

    this.testingCounter = this.testingCounter + 1;
    if (this.testingCounter === 1) {
      console.log('get_next(); return ' + first.title);
      return first;
    } else if (this.testingCounter === 2) {
      console.log('get_next(); return ' + second.title);
      return second;
    } else if (this.testingCounter === 3) {
      console.log('get_next(); return ' + third.title);
      return third;
    } else if (this.testingCounter === 4) {
      console.log('get_next(); return ' + four.title);
      return four;
    }
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

export class Task extends ChaseElement {
  title: string;
  text: string;
  image: string;
}

export class Solution extends ChaseElement {
  title: string;
  text: string;
  type: string;
  submitted: string;
}
