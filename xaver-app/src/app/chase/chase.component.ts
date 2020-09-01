import { Component, OnInit } from '@angular/core';

import { Chase } from '../chase';

@Component({
  selector: 'app-chase',
  templateUrl: './chase.component.html',
  styleUrls: ['./chase.component.scss']
})
export class ChaseComponent implements OnInit {
  chase: Chase

  constructor() { }

  ngOnInit(): void {
  }

}
