import { Component, OnInit } from '@angular/core';

import { Chase, ChaseMetaData, GameElement, Image } from 'chase-model';
import { ChaseService } from 'chase-services';

import { ChaseEditorService } from 'src/app/services/chase-editor.service';

@Component({
  selector: 'app-meta-data-editor',
  templateUrl: './meta-data-editor.component.html',
  styleUrls: ['./meta-data-editor.component.scss']
})
export class MetaDataEditorComponent implements OnInit {
  initialElement = '';

  constructor(
    public chaseEditor: ChaseEditorService,
    public chaseService: ChaseService,
  ) { }

  ngOnInit(): void {
  }

  reloadChase(): void {
    this.initialElement = this.chaseEditor.getElementNameById(this.chaseEditor.getChase().initialGameElement);
  }

  onInitialGameElementChange(value: string) {
    this.chaseEditor.getChase().initialGameElement = this.chaseEditor.getElementIdByName(value);
    this.initialElement = value;
    console.log('Set initial game element to ' + this.chaseEditor.getChase().initialGameElement);
  }

  saveInputElements(): void {
  }

  getChaseId(): string {
    if (this.chaseEditor.getChase() && this.chaseEditor.getChase().metaData.chaseId) {
      return this.chaseEditor.getChase().metaData.chaseId;
    }
  }

  getImage(): string {
    return this.chaseEditor.getChase().metaData.preview.image;
  }
  updateImage(mediaId: string): void {
    this.chaseEditor.getChase().metaData.preview.image= mediaId;
  }

  getAuthorImage(): string {
    return this.chaseEditor.getChase().metaData.author.image;
  }
  updateAuthorImage(mediaId: string): void {
    this.chaseEditor.getChase().metaData.author.image= mediaId;
  }
}
