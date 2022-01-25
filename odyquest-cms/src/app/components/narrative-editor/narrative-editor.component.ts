import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import {
  GameElement,
  Image,
  Media,
  Narrative,
  NarrativeType,
  NarrativeStatus,
} from 'chase-model';
import { XButton } from 'chase-model';

import { ChaseEditorService } from 'src/app/services/chase-editor.service';

@Component({
  selector: 'app-narrative-editor',
  templateUrl: './narrative-editor.component.html',
  styleUrls: ['./narrative-editor.component.scss']
})
export class NarrativeEditorComponent implements OnInit {
  gameElement: Narrative = new Narrative();

  narrative_status: NarrativeStatus;
  public selected_narrative_status_int = 1; // "Continue" = 1, "Win" = 2, "Loose" = 3
  narrative_type: NarrativeType;

  buttons: Array<XButton>;
  buttonDestinationList: Array<string>;

  initial_setup = true;

  constructor(
    private cd: ChangeDetectorRef,
    private chaseEditor: ChaseEditorService
  ) { }

  ngOnInit(): void {
  }

  gameElementToLocal(): void {
    // Individual stuff
    if (this.gameElement instanceof Narrative) {
      this.narrative_status = this.gameElement.narrativeStatus;
      if (this.narrative_status === NarrativeStatus.Continue) {
        this.selected_narrative_status_int = 1;
      } else if (this.narrative_status === NarrativeStatus.Win) {
        this.selected_narrative_status_int = 2;
      } else {
        this.selected_narrative_status_int = 3;
      }

      this.narrative_type = this.gameElement.narrativeType;

      console.log('loaded narrative status as: ', this.narrative_status);
      this.buttons = this.gameElement.buttons;
      this.buttonDestinationList = new Array<string>();
      for (const button of this.buttons) {
        this.buttonDestinationList.push(this.chaseEditor.getElementNameById(button.destination));
      }
      console.log('Number of Buttons: ', this.buttons.length);
    }
  }

  localToGameElement(): void {
    if (this.gameElement instanceof Narrative) {
      this.gameElement.narrativeStatus = this.narrative_status;
      this.gameElement.narrativeType = this.narrative_type;
      this.gameElement.buttons = this.buttons;
    }
  }

  reloadChase(): void {
    // this.chaseEditor.getChase() = chase;
  }

  setGameElementToEdit(gm: Narrative): void {
    if (this.initial_setup) {
      this.initial_setup = false;
    } else {
      // save all stuff that was done in the old editor
      this.localToGameElement();
    }

    this.gameElement = gm;

    console.log('Title: ' + this.gameElement.title);

    this.gameElementToLocal();

    // we need to manually tell angular that changes occured:
    this.cd.detectChanges();
  }

  addButton() {
    console.log('addButton()');

    const button = new XButton();
    button.name = 'Weiter'; // FIXME localize
    // just use some id which is actually existing
    button.destination = this.chaseEditor.getElementIdByName(
      this.chaseEditor.getElementNames()[0]
    );

    this.buttons.push(button);
    // this.buttonDestinationList[this.gameElementsList[0]];
  }

  deleteNarrativeButton(index: number) {
    console.log('deleteNarrativeButton(' + index + ')');
    this.buttons.splice(index, 1);
    this.buttonDestinationList.splice(index, 1);
  }

  onNarrativeButtonDestinationChange(index: number, value: string) {
    this.buttons[index].destination = this.chaseEditor.getElementIdByName(value);
    this.buttonDestinationList[index] = value;
  }

  onNarrativeTypeChange(value: NarrativeType) {
    console.log('Narrative type to ' + value);
    this.narrative_type = value;
  }

  onNarrativeStatusChange(value: number) {
    console.log('Narrative status to ' + value);
    switch (value) {
      case 1: // "Continue"
        this.narrative_status = NarrativeStatus.Continue;
        console.log(this.selected_narrative_status_int);
        break;
      case 2: // "Win"
        this.narrative_status = NarrativeStatus.Win;
        console.log(this.selected_narrative_status_int);
        break;
      case 3: // "Loose"
        this.narrative_status = NarrativeStatus.Loose;
        console.log(this.selected_narrative_status_int);
        break;
    }
  }

  updateMedia(media: Media): void {
    (this.gameElement as Narrative).setCurrentMedia(media);
  }

  getNarrativeType(type: string): NarrativeType {
    switch (type) {
      case NarrativeType.Text:
        return NarrativeType.Text;
      case NarrativeType.Audio:
        return NarrativeType.Audio;
      case NarrativeType.Video:
        return NarrativeType.Video;
    }
  }

  hasMedia(): boolean {
    return this.gameElement && this.gameElement instanceof Narrative;
  }

  getMedia(): Media {
    return (this.gameElement as Narrative).getCurrentMedia();
  }

  needsMediaUpload(): boolean {
    if (this.hasMedia()) {
      return this.narrative_type === NarrativeType.Audio || this.narrative_type === NarrativeType.Video;
    } else {
      return false;
    }
  }

}
