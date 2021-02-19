import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

import { Description } from '../../../shared/models/description';
import { Quest, QuestType } from '../../../shared/models/quest';
import { QuestStatus } from '../../../core/services/game.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent {
  help = new Array<Description>();
  questStatus = new QuestStatus(new Quest());
  index = 0;
  pageNumber: string;

  constructor(public dialogRef: MatDialogRef<HelpComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer) {
    this.help = this.data.quest.help;
    this.questStatus = this.data.status;
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
      console.log('next help');
      this.index++;
    }
    this.setPageNumber();
  }

  has_previous(): boolean {
    return this.index > 0;
  }
  previous(): void {
    if (this.has_previous()) {
      console.log('previous help');
      this.index--;
    }
    this.setPageNumber();
  }

  getImage(): SafeResourceUrl {
     return this.sanitizer.bypassSecurityTrustUrl(this.help[this.index].image);
  }
}
