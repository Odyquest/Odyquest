import { Component, OnInit } from '@angular/core';

import { Chase, ChaseMetaData, GameElement, Image } from 'chase-model';

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

  updateImage(image: Image): void {
    this.chaseEditor.getChase().metaData.preview.description.image = image;
  }

  getImage(): Image {
    return this.chaseEditor.getChase().metaData.preview.description.image || new Image();
  }
}
