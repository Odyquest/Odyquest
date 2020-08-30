import { Component, OnInit } from '@angular/core';
import { Description } from '../chase';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  description: Description

  constructor() { }

  ngOnInit(): void {
  }

}
