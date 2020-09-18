import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { Quest } from '../chase';

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
    this.quest = new Quest();
    this.quest.title = 'Quest title';
    this.quest.text = 'Quest text';
  }

  select(button: string): void {
    // TODO set output selection
    this.selection.emit(0);
  }

}
