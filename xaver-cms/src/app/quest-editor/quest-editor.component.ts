import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GameElement } from 'src/app/shared/models/gameElement';

@Component({
  selector: 'app-quest-editor',
  templateUrl: './quest-editor.component.html',
  styleUrls: ['./quest-editor.component.scss']
})
export class QuestEditorComponent implements OnInit {

  gameElement: GameElement;
  
  //current state of the form:
  title: string;
  description: string;

  hide_object_search = false
  hide_input_term = true
  hide_multiple_choice = true

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  onQuestTypeChange(value: String) {
    console.log("Changed quest type to " + value);
    switch (value) {
      case "input-term":
        this.hide_object_search = true
        this.hide_input_term = false
        this.hide_multiple_choice = true
        break;
      case "multiple-choice":
        this.hide_object_search = true
        this.hide_input_term = true
        this.hide_multiple_choice = false
        break;
      case "object-search":
        this.hide_object_search = false
        this.hide_input_term = true
        this.hide_multiple_choice = true
        break;
    }
  }

  // hardly a sexy solution...
  // input forms can't read directly from GE?
  gameElementToLocal(): void {
    this.title = this.gameElement.title;
    this.description = this.gameElement.description.text;
  }

  localToGameElement(): void {
    this.gameElement.title = this.title;

  }

  setGameElementToEdit(gm: GameElement): void {
    this.gameElement = gm;
    console.log("Set Game Element to: " + this.gameElement.title);

    this.gameElementToLocal();

    //we need to manually tell angular that changes occured:
    this.cd.detectChanges();
  }

}
