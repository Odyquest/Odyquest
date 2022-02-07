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
  buttonDestinationList: Array<string>;
  initialSetup = true;

  constructor(
    private cd: ChangeDetectorRef,
    public chaseEditor: ChaseEditorService
  ) { }

  ngOnInit(): void {
  }

  gameElementToLocal(): void {
    // Individual stuff
    if (this.gameElement instanceof Narrative) {
      this.buttonDestinationList = new Array<string>();
      for (const button of this.gameElement.buttons) {
        this.buttonDestinationList.push(this.chaseEditor.getElementNameById(button.destination));
      }
      console.log('Number of Buttons: ', this.gameElement.buttons.length);
    }
  }

  localToGameElement(): void {
  }

  reloadChase(): void {
  }

  setGameElementToEdit(gm: Narrative): void {
    if (this.initialSetup) {
      this.initialSetup = false;
    } else {
      // save all stuff that was done in the old editor
      this.localToGameElement();
    }

    this.gameElement = gm;
    this.gameElementToLocal();

    // we need to manually tell angular that changes occured:
    this.cd.detectChanges();
  }

  addButton() {
    console.log('addButton()');
    const button = new XButton();
    button.name = 'Weiter'; // FIXME localize
    button.destination = this.chaseEditor.getElementIdByName(
                           this.chaseEditor.getElementNames()[0]);
    this.gameElement.buttons.push(button);
  }

  deleteNarrativeButton(index: number) {
    console.log('deleteNarrativeButton(' + index + ')');
    this.gameElement.buttons.splice(index, 1);
    this.buttonDestinationList.splice(index, 1);
  }

  onNarrativeButtonDestinationChange(index: number, value: string) {
    this.gameElement.buttons[index].destination = this.chaseEditor.getElementIdByName(value);
    this.buttonDestinationList[index] = value;
  }

  onNarrativeTypeChange(value: NarrativeType) {
    console.log('Narrative type to ' + value);
    this.gameElement.narrativeType = value;
  }

  onNarrativeStatusChange(value: NarrativeStatus) {
    console.log('Narrative status to ' + value);
    this.gameElement.narrativeStatus = value;
  }

  updateMedia(mediaId: string): void {
    this.gameElement.media = mediaId;
  }

  getNarrativeStatus(type: string): NarrativeStatus {
    switch (type) {
      case NarrativeStatus.Continue:
        return NarrativeStatus.Continue;
      case NarrativeStatus.Win:
        return NarrativeStatus.Win;
      case NarrativeStatus.Loose:
        return NarrativeStatus.Loose;
    }
  }

  getNarrativeType(type: string): NarrativeType {
    switch (type) {
      case NarrativeType.Text:
        return NarrativeType.Text;
      case NarrativeType.Audio:
        return NarrativeType.Audio;
      case NarrativeType.Video:
        return NarrativeType.Video;
      case NarrativeType.AugmentedReality:
        return NarrativeType.AugmentedReality;
      default:
        console.error('Unknown narrative type ', type);
    }
  }

  getSelectedType(): NarrativeType {
    return (this.gameElement as Narrative).narrativeType;
  }

  hasMedia(): boolean {
    return this.gameElement && this.gameElement instanceof Narrative;
  }

  getMedia(): string {
    return (this.gameElement as Narrative).media;
  }

  needsMediaUpload(): boolean {
    if (this.hasMedia()) {
      return this.gameElement.narrativeType === NarrativeType.Audio
        || this.gameElement.narrativeType === NarrativeType.Video
        || this.gameElement.narrativeType === NarrativeType.AugmentedReality;
    } else {
      return false;
    }
  }

}
