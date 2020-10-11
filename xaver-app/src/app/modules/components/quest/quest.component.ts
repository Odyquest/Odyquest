import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { Quest, QuestType } from '../../../shared/models/quest';
import { Description } from '../../../shared/models/description';
import { QuestStatus } from '../../../core/services/gameEngine';
import { SubmitSolutionComponent } from '../submit-solution/submit-solution.component';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.scss']
})
export class QuestComponent implements OnInit {
  @Input() quest: Quest;
  @Input() questStatus: QuestStatus;
  @Output() selection: EventEmitter<number> = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  select(button: string): void {
    // TODO set output selection
    this.selection.emit(0);
  }

  submit(): void {
    const dialogRef = this.dialog.open(SubmitSolutionComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Submitted: ${result}`); // Pizza!
    });
  }

  isText(): boolean {
    return this.quest.questType === QuestType.Text;
  }

  isMultipleChoice(): boolean {
    return this.quest.questType === QuestType.MultipleChoice;
  }

}
