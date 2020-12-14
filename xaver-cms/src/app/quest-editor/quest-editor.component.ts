import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GameElement } from 'src/app/shared/models/gameElement';
import { Quest } from 'src/app/shared/models/quest';
import { Narrative } from 'src/app/shared/models/narrative';
import { Solution } from 'src/app/shared/models/solution';

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

  is_quest: boolean;
  is_narrative: boolean;
  is_solution: boolean;

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
  // input forms can't read directly from GameElement?
  gameElementToLocal(): void {
    this.title = this.gameElement.title;
    this.description = this.gameElement.description.text;
    console.log("Description: ", this.gameElement.description);
  }

  localToGameElement(): void {
    this.gameElement.title = this.title;
  }

  setGameElementToEdit(gm: GameElement): void {
    this.gameElement = gm;

    if ((gm instanceof Quest)) {
      console.log("Loading Quest in Editor");
      this.is_quest = true;
      this.is_narrative = false;
      this.is_solution = false;
    } else if ((gm instanceof Narrative)) {
      console.log("Loaidng Narrative in Editor");
      this.is_quest = false;
      this.is_narrative = true;
      this.is_solution = false;
    } else if ((gm instanceof Solution)) {
      console.log("Loading Solution in Editor");
      this.is_quest = false;
      this.is_narrative = false;
      this.is_solution = true;
    }
    console.log("Title: " + this.gameElement.title);

    this.gameElementToLocal();

    //we need to manually tell angular that changes occured:
    this.cd.detectChanges();
  }

  save(): void {
    console.log("save");
    //todo
  }

  reset(): void {
    console.log("reset");
    this.gameElementToLocal();
  }

}
