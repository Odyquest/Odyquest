import { Component, OnInit } from '@angular/core';

import { Chase, ChaseElement } from '../chase';

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
  }

  ngOnLoad(): void {
    // load current chase/description
  }

  ngOnNext(): void {
    // which element is next?
    this.displayElement = this.chase.get_next();
  }

}
