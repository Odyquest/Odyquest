import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

import { Description } from 'chase-model';
import { Quest, QuestType } from 'chase-model';
import { QuestStatus } from '../../../core/services/game.service';

@Component({
  selector: 'app-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.scss']
})
export class HintComponent {
  help = new Array<Description>();
  index = 0;
  pageNumber: string;

  constructor(public dialogRef: MatDialogRef<HintComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.help = this.data.quest.help;
    if (this.help.length < 1) {
      console.log('No help available, close immediately');
      this.closeDialog();
    }
    this.setPageNumber();
  }

  setPageNumber(): void {
    this.pageNumber = ' ' + (this.index + 1) + '/' + this.help.length + ' ';
  }

  closeDialog(): void  {
  }

  has_next(): boolean {
    return this.index < this.help.length - 1;
  }

  next(): void {
    if (this.has_next()) {
      console.log('next hint');
      this.index++;
    }
    this.setPageNumber();
  }

  has_previous(): boolean {
    return this.index > 0;
  }
  previous(): void {
    if (this.has_previous()) {
      console.log('previous hint');
      this.index--;
    }
    this.setPageNumber();
  }

  getDescription(): Description {
     return this.help[this.index];
  }

  getCurrentHelpText(): string {
    return this.help[this.index].text;
  }

  getImgClass(): string {
    return 'game_element_image';
  }
}
