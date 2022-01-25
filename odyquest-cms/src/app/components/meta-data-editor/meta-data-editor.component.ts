import { Component, OnInit } from '@angular/core';

import { Chase, ChaseMetaData, GameElement, Image } from 'chase-model';

import { ChaseEditorService } from 'src/app/services/chase-editor.service';

@Component({
  selector: 'app-meta-data-editor',
  templateUrl: './meta-data-editor.component.html',
  styleUrls: ['./meta-data-editor.component.scss']
})
export class MetaDataEditorComponent implements OnInit {
  title = '';
  author = '';
  description = '';
  published = false;
  initialElement = '';
  image = new Image();

  constructor(
    private chaseEditor: ChaseEditorService,
  ) { }

  ngOnInit(): void {
  }

  reloadChase(): void {
    this.title = this.chaseEditor.getChase().metaData.title;
    this.author = this.chaseEditor.getChase().metaData.author;
    this.description = this.chaseEditor.getChase().metaData.preview.description.text;
    this.image = this.chaseEditor.getChase().metaData.preview.description.image;

    this.initialElement = this.chaseEditor.getElementNameById(this.chaseEditor.getChase().initialGameElement);
    this.published = this.chaseEditor.getChase().metaData.published;
  }

  onInitialGameElementChange(value: string) {
    this.chaseEditor.getChase().initialGameElement = this.chaseEditor.getElementIdByName(value);
    this.initialElement = value;
    console.log('Set initial game element to ' + this.chaseEditor.getChase().initialGameElement);
  }

  saveInputElements(): void {
    this.chaseEditor.getChase().metaData.published = this.published;
    this.chaseEditor.getChase().metaData.title = this.title;
    this.chaseEditor.getChase().metaData.author = this.author;
    this.chaseEditor.getChase().metaData.preview.description.text = this.description;
    this.chaseEditor.getChase().metaData.preview.description.image = this.image;
    this.chaseEditor.getChase().metaData.published = this.published;
  }

  getChaseId(): string {
    if (this.chaseEditor.getChase() && this.chaseEditor.getChase().metaData.chaseId) {
      return this.chaseEditor.getChase().metaData.chaseId;
    }
  }

  updateImage(image: Image): void {
    this.image = image;
  }

  getImage(): Image {
    return this.image || new Image();
  }
}
