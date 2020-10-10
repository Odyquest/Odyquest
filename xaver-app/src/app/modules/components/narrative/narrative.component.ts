import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { Narrative } from '../../../shared/models/narrative';

@Component({
  selector: 'app-narrative',
  templateUrl: './narrative.component.html',
  styleUrls: ['./narrative.component.scss']
})
export class NarrativeComponent implements OnInit {
  @Input() narrative: Narrative;
  @Output() selection: EventEmitter<number> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  select(button: number): void {
    // console.log('narrative: ' + button + ' selected');
    this.selection.emit(button);
  }

}
