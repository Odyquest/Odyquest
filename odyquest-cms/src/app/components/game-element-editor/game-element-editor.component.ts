import { Component, OnInit, ViewChild } from '@angular/core';

import { Description, GameElement, Narrative, Quest } from 'chase-model';
import { ChaseService } from 'chase-services';
import { ChaseEditorService } from 'src/app/services/chase-editor.service';

@Component({
  selector: 'app-game-element-editor',
  templateUrl: './game-element-editor.component.html',
  styleUrls: ['./game-element-editor.component.scss']
})
export class GameElementEditorComponent implements OnInit {
  gameElement: GameElement = new Narrative();

  is_quest: boolean;
  is_narrative: boolean;
  initial_setup = true;

  @ViewChild('narrative_editor') narrativeEditor;
  @ViewChild('quest_editor') questEditor;

  constructor(
    public chaseEditor: ChaseEditorService,
    public chaseService: ChaseService,
  ) {}

  ngOnInit(): void {
  }

  reloadChase(): void {
    this.narrativeEditor.reloadChase();
    this.questEditor.reloadChase();
  }

  setGameElementToEdit(gm: GameElement): void {
    if (this.initial_setup) {
      this.initial_setup = false;
    } else {
      // save all stuff that was done in the old editor
      this.localToGameElement();
    }

    this.gameElement = gm;

    if (gm instanceof Quest) {
      console.log('Loading Quest in Editor');
      this.questEditor.setGameElementToEdit(gm);
      this.is_quest = true;
      this.is_narrative = false;
    } else if (gm instanceof Narrative) {
      console.log('Loading Narrative in Editor');
      this.narrativeEditor.setGameElementToEdit(gm);
      this.is_quest = false;
      this.is_narrative = true;
    }
    console.log('Title: ' + this.gameElement.title);

    this.gameElementToLocal();

    // we need to manually tell angular that changes occured:
    // this.cd.detectChanges();
  }

  gameElementToLocal() {
    // TODO notify childs?
  }

  localToGameElement(): void {
    if (this.is_narrative) {
      this.narrativeEditor.localToGameElement();
    } else if (this.is_quest) {
      this.questEditor.localToGameElement();
    }
  }

  deleteHelpText(index: number) {
    console.log('deleteHelpText(' + index + ')');
    this.gameElement.hint.splice(index, 1);
  }

  onTitleChange(): void {
    // TODO notify main editor/all editors
  }

  addHelpText() {
    console.log('addHelpText()', this.gameElement.hint);

    const hintText = new Description();
    hintText.text = 'HilfeText'; // FIXME localize
    this.gameElement.hint.push(hintText);

  }

  updateHelpImage(hintId: number, mediaId: string): void {
    this.gameElement.hint[hintId].image = mediaId;
  }


  updateImage(mediaId: string): void {
    this.gameElement.description.image = mediaId;
  }

  getImage(): string {
    return this.gameElement.description.image;
  }
  getHelpImage(index: number): string {
    return this.gameElement.hint[index].image;
  }

}
