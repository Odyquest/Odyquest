import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject, Optional } from '@angular/core';

import { Description, Media, Image } from 'chase-model';
import { Quest, QuestType } from 'chase-model';
import { GameService, QuestStatus } from '../../../core/services/game.service';

@Component({
  selector: 'app-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.scss']
})
export class HintComponent {
  hint = new Array<Description>();
  index = 0;
  pageNumber: string;

  constructor(public dialogRef: MatDialogRef<HintComponent>,
              private game: GameService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.hint = this.data.quest.hint;
    if (this.hint.length < 1) {
      console.log('No hint available, close immediately');
      this.closeDialog();
    }
    this.setPageNumber();
  }

  setPageNumber(): void {
    this.pageNumber = ' ' + (this.index + 1) + '/' + this.hint.length + ' ';
  }

  closeDialog(): void  {
  }

  has_next(): boolean {
    return this.index < this.hint.length - 1;
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
     return this.hint[this.index];
  }

  getCurrentText(): string {
    if (!this.hint[this.index]) {
      return '';
    }
    return this.hint[this.index].text;
  }

  getCurrentImage(): Image {
    if (!this.hint[this.index]) {
      return new Image();
    }
    const image = this.game.chase.getMedia<Image>(this.hint[this.index].image);
    if (!image) {
      return new Image();
    }
    return image;
  }

  getImgClass(): string {
    return 'game_element_image';
  }
}
