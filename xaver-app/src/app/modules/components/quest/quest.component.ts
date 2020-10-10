import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { Quest, QuestType } from '../../../shared/models/quest';
import { Description } from '../../../shared/models/description';
import { QuestStatus } from '../../../core/services/gameEngine';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.scss']
})
export class QuestComponent implements OnInit {
  @Input() quest: Quest;
  @Input() questStatus: QuestStatus;
  @Output() selection: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  select(button: string): void {
    // TODO set output selection
    this.selection.emit(0);
  }

  isText(): boolean {
    return this.quest.questType === QuestType.Text;
  }

  isMultipleChoice(): boolean {
    return this.quest.questType === QuestType.MultipleChoice;
  }

}
