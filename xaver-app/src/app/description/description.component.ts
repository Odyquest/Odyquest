import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { Description } from '../chase';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  @Input() description: Description;
  @Output() selection: EventEmitter<number> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  select(button: string): void {
    // TODO set output selection
    this.selection.emit(0);
  }

}
