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

  @ViewChild('quest_editor') questEditor;

  constructor() { }

  ngOnInit(): void {
  }

  setChase(chase: Chase): void {
    this.questEditor.setChase(chase);
  }

  setGameElementToEdit(element: GameElement): void {
    this.elementType = ElementType.GameElement;
    this.questEditor.setGameElementToEdit(element);
  }

  saveChangesToGameElement(): void {
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
