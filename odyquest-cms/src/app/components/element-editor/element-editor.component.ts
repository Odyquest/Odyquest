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
  @ViewChild('game_element_editor') gameElementEditor;

  constructor() { }

  ngOnInit(): void {
  }

  reloadChase(): void {
    this.metaDataEditor.reloadChase();
    this.gameElementEditor.reloadChase();
  }

  setMetaDataToEdit(): void {
    this.elementType = ElementType.MetaData;
  }

  setGameElementToEdit(element: GameElement): void {
    this.elementType = ElementType.GameElement;
    this.gameElementEditor.setGameElementToEdit(element);
  }

  saveMetaDataChangesToChase(): void {
    if (this.elementType === ElementType.MetaData) {
      this.metaDataEditor.saveInputElements();
    }
  }

  saveGameElementChangesToChase(): void {
    if (this.elementType === ElementType.GameElement) {
      this.gameElementEditor.localToGameElement();
    }
  }

  isEditingMetaData() {
    return this.elementType === ElementType.MetaData;
  }

  isEditingGameElement() {
    return this.elementType === ElementType.GameElement;
  }
}
