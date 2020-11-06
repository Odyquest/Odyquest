import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

import { Quest, QuestType } from '../../../shared/models/quest';

class Item {
  name: string;
  selected: boolean;
  constructor(name: string) {
    this.name = name;
    this.selected = false;
  }
}

@Component({
  selector: 'app-submit-solution',
  templateUrl: './submit-solution.component.html',
  styleUrls: ['./submit-solution.component.scss']
})
export class SubmitSolutionComponent {
  quest = new Quest();
  textResult = '';
  items = Array<Item>();

  constructor(public dialogRef: MatDialogRef<SubmitSolutionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.quest = this.data.quest;
    if (this.isMultipleChoice()) {
      for (const item of this.quest.requirementCombination.solutionItems) {
        this.items.push(new Item(item));
      }
    }
  }

  submit(): void {
    const result = new Array<string>();
    if (this.isText()) {
      result.push(this.textResult);
    } else if (this.isMultipleChoice()) {
      for (const item of this.items) {
        if (item.selected) {
          result.push(item.name);
        }
      }
    } else {
      // FIXME cover other cases
    }
    this.dialogRef.close(result);
  }

  isText(): boolean {
    return this.quest.questType === QuestType.Text;
  }

  isMultipleChoice(): boolean {
    return this.quest.questType === QuestType.MultipleChoice;
  }

}
