import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

import { Description } from '../../../shared/models/description';
import { Quest, QuestType } from '../../../shared/models/quest';
import { QuestStatus } from '../../../core/services/gameEngine';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent {
  help = new Array<Description>();
  questStatus = new QuestStatus(new Quest());
  index = 0;

  constructor(public dialogRef: MatDialogRef<HelpComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.help = this.data.quest.help;
    this.questStatus = this.data.status;
    if (this.help.length < 1) {
      console.log('No help available, close immediately');
      this.closeDialog();
    }
  }

  closeDialog(): void  {
    console.log('closeDialog() pass Pizza');
    this.dialogRef.close('Pizza!');
  }

  next(): void {
    if (this.index < this.help.length - 1) {
      console.log('next help');
      this.index++;
    }
  }

  previous(): void {
    if (this.index > 0) {
      console.log('previous help');
      this.index--;
    }
  }

}
