import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

import { Quest, QuestType } from '../../../shared/models/quest';

@Component({
  selector: 'app-submit-solution',
  templateUrl: './submit-solution.component.html',
  styleUrls: ['./submit-solution.component.scss']
})
export class SubmitSolutionComponent {
  quest = new Quest();

  constructor(public dialogRef: MatDialogRef<SubmitSolutionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.quest = this.data.quest;
  }

  closeDialog(): void  {
    console.log('closeDialog() pass Pizza');
    this.dialogRef.close('Pizza!');
  }

  isText(): boolean {
    return this.quest.questType === QuestType.Text;
  }

  isMultipleChoice(): boolean {
    return this.quest.questType === QuestType.MultipleChoice;
  }

}
