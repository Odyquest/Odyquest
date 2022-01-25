import { Component, OnInit, ViewChild } from '@angular/core';

import { Chase, ChaseMetaData, GameElement } from 'chase-model';

enum ElementType {
  MetaData,
  GameElement
}

@Component({
  selector: 'app-element-editor',
  templateUrl: './element-editor.component.html',
  styleUrls: ['./element-editor.component.scss']
})
export class ElementEditorComponent implements OnInit {

  elementType = ElementType.MetaData;

  @ViewChild('meta_data_editor') metaDataEditor;
  @ViewChild('quest_editor') questEditor;

  constructor() { }

  ngOnInit(): void {
  }

  reloadChase(): void {
    this.metaDataEditor.reloadChase();
    this.questEditor.reloadChase();
  }

  setMetaDataToEdit(): void {
    this.elementType = ElementType.MetaData;
  }

  setGameElementToEdit(element: GameElement): void {
    this.elementType = ElementType.GameElement;
    this.questEditor.setGameElementToEdit(element);
  }

  saveMetaDataChangesToChase(): void {
    if (this.elementType === ElementType.MetaData) {
      this.metaDataEditor.saveInputElements();
    }
  }

  saveGameElementChangesToChase(): void {
    if (this.elementType === ElementType.GameElement) {
      this.questEditor.localToGameElement();
    }
  }

  isEditingMetaData() {
    return this.elementType === ElementType.MetaData;
  }

  isEditingGameElement() {
    return this.elementType === ElementType.GameElement;
  }
}
