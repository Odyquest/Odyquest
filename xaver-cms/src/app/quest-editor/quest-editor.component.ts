import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GameElement } from 'src/app/shared/models/gameElement';
import { Quest } from 'src/app/shared/models/quest';
import { Narrative, NarrativeType, NarrativeStatus } from 'src/app/shared/models/narrative';
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
  image_url: string;

  is_quest: boolean;
  is_narrative: boolean;
  is_solution: boolean;

  hide_object_search = false;
  hide_input_term = true;
  hide_multiple_choice = true;

  narrative_status: NarrativeStatus;
  public selected_narrative_status_int = 1; //"Continue" = 1, "Win" = 2, "Loose" = 3

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

  onNarrativeStatusChange(value: String) {
    console.log("Narrative status to " + value);
    switch (value) {
      case "1": // "Continue"
        this.narrative_status = NarrativeStatus.Continue;
        console.log(this.selected_narrative_status_int);
        break;
      case "2": // "Win"
        this.narrative_status = NarrativeStatus.Win;
        console.log(this.selected_narrative_status_int);
        break;
      case "3": // "Loose"
        this.narrative_status = NarrativeStatus.Loose;
        console.log(this.selected_narrative_status_int);
        break;
    }
  }

  // hardly a sexy solution...
  // input forms can't read directly from GameElement?
  gameElementToLocal(): void {
    //common to all GameElements
    this.title = this.gameElement.title;
    this.description = this.gameElement.description.text;
    this.image_url = this.gameElement.description.image;

    //Individual stuff
    if ((this.gameElement instanceof Quest)) {
    } else if ((this.gameElement instanceof Narrative)) {
      this.narrative_status = this.gameElement.narrativeStatus;
      if (this.narrative_status == NarrativeStatus.Continue) {
        this.selected_narrative_status_int = 1;
      } else if (this.narrative_status == NarrativeStatus.Win) {
        this.selected_narrative_status_int = 2;
      } else {
        this.selected_narrative_status_int = 3;
      }
      console.log("loaded narrative status as: ", this.narrative_status);
    } else if ((this.gameElement instanceof Solution)) {
    }
  }

  localToGameElement(): void {
    this.gameElement.title = this.title;
    this.gameElement.description.text = this.description;
    this.gameElement.description.image = this.image_url;

    if ((this.gameElement instanceof Quest)) {
    } else if ((this.gameElement instanceof Narrative)) {
      this.gameElement.narrativeStatus = this.narrative_status;
    } else if ((this.gameElement instanceof Solution)) {
    }
  }

  setGameElementToEdit(gm: GameElement): void {
    this.gameElement = gm;

    if ((gm instanceof Quest)) {
      console.log("Loading Quest in Editor");
      this.is_quest = true;
      this.is_narrative = false;
      this.is_solution = false;
    } else if ((gm instanceof Narrative)) {
      console.log("Loading Narrative in Editor");
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


