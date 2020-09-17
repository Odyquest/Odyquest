import { Component, OnInit } from '@angular/core';

import { Chase, ChaseElement, Description, Task, Solution } from '../chase';

@Component({
  selector: 'app-chase',
  templateUrl: './chase.component.html',
  styleUrls: ['./chase.component.scss']
})
export class ChaseComponent implements OnInit {
  chase: Chase;
  displayElement: ChaseElement;

  constructor() { }

  ngOnInit(): void {
    this.chase = new Chase();
    this.chase.title = 'demo chase';
    this.displayElement = this.chase.get_next('null');
     // const element = new Description();
     // element.title = 'example';
     // this.displayElement = element;

  }

  ngOnLoad(): void {
    // load current chase/description
  }

  onSelection(button: string): void {
    this.displayElement = this.chase.get_next(button);
  }

  ngOnNext(): void {
    // which element is next?
    this.displayElement = this.chase.get_next('null');
  }

  isDescription(element: ChaseElement): boolean {
    return element instanceof Description;
  }

  isTask(element: ChaseElement): boolean {
    return element instanceof Task;
  }

  isSolution(element: ChaseElement): boolean {
    return element instanceof Solution;
  }

}
