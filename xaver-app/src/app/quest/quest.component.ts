import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { Quest } from '../model/quest';
import { Description } from '../model/description';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.scss']
})
export class QuestComponent implements OnInit {
  @Input() quest: Quest;
  @Output() selection: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  select(button: string): void {
    // TODO set output selection
    this.selection.emit(0);
  }

}
