import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GameElement } from 'src/app/shared/models/gameElement';
import { Quest, QuestType } from 'src/app/shared/models/quest';
import { Narrative, NarrativeType, NarrativeStatus } from 'src/app/shared/models/narrative';
import { XButton } from 'src/app/shared/models/xButton'
import { Chase } from '../shared/models/chase';
import { LogicType, SolutionTerm } from '../shared/models/solution_term';
import { CombineLatestSubscriber } from 'rxjs/internal/observable/combineLatest';
//import { MainEditorComponent } from '../components/main-editor/main-editor.component'

@Component({
  selector: 'app-quest-editor',
  templateUrl: './quest-editor.component.html',
  styleUrls: ['./quest-editor.component.scss']
})
export class QuestEditorComponent implements OnInit {

  chase: Chase;
  gameElement: GameElement;

  //current state of the form:
  title: string;
  description: string;
  image_url: string;

  is_quest: boolean;
  is_narrative: boolean;

  //Quest
  solutionItems: Array<string>;
  combinationMap: Array<SolutionTerm>
  maxTries: number;
  public quest_type_status_int; //"Text" = 1, "MultipleChoice" = 2
  questType: QuestType;

  //Narrative
  narrative_status: NarrativeStatus;
  public selected_narrative_status_int = 1; //"Continue" = 1, "Win" = 2, "Loose" = 3
  narrative_type: NarrativeType;
  public selected_narrative_type_int = 1; //"Text" = 1, "Panorama" = 2

  buttons: Array<XButton>;
  gameElementsMap: Map<number, string>;
  gameElementsList: string[];

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  onQuestTypeChange(value: String) {
    console.log("Changed quest type to " + value);
    switch (value) {
      case "1":
        this.questType = QuestType.Text;
        break;
      case "2":
        this.questType = QuestType.Text;
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

  onNarrativeTypeChange(value: String) {
    console.log("Narrative type to " + value);
    switch (value) {
      case "1": // "Text"
        this.narrative_type = NarrativeType.Text;
        console.log(this.selected_narrative_type_int);
        break;
      case "2": // "Panorama"
        this.narrative_type = NarrativeType.Panorama;
        console.log(this.selected_narrative_type_int);
        break;
    }
  }

  parseIdFromGEString(text: string): number {
    let id_text = text.substr(text.lastIndexOf("(") + 1); //)
    id_text = id_text.substr(0, id_text.length - 1);

    return +id_text;
  }

  onNarrativeButtonDestinationChange(index: number, value: string) {
    this.buttons[index].destination = this.parseIdFromGEString(value);
    console.log("Set Destination of buttons[" + index + "], to " + this.buttons[index].destination);
  }

  onCombinationMapDestinationChange(index: number, value: string) {
    this.combinationMap[index].destination = this.parseIdFromGEString(value);
    console.log("Set Destination of CombinationMap[" + index + "], to " + this.combinationMap[index].destination);
  }

  deleteNarrativeButton(index: number) {
    console.log("deleteNarrativeButton(" + index + ")");

    this.buttons.splice(index, 1);
  }

  deleteQuestSolution(index: number) {
    console.log("deleteQuestSolution(" + index + ")");

    this.solutionItems.splice(index, 1);

    //todo need to update various other stuff
  }

  deleteSolutionCombination(index: number) {
    console.log("deleteSolutionCombination(" + index + ")");

    this.combinationMap.splice(index, 1);
  }

  addButton() {
    console.log("addButton()");
    console.log(this.buttons.length);

    let button = new XButton();
    button.name = "Weiter";
    //just use some id which is actually existing
    button.destination = this.parseIdFromGEString(this.gameElementsMap.values().next().value);

    this.buttons.push(button);

    console.log(this.buttons.length);
  }

  addSolutionItem() {
    console.log("addSolutionItem()");

    let solution = "Neue Lösung";

    //todo need to update various other stuff
    for(var comb = 0; comb < this.combinationMap.length; comb++){
      this.combinationMap[comb].requiredItems.push(true);
    }

    //just use some id which is actually existing
    //button.destination = this.parseIdFromGEString(this.gameElementsMap.values().next().value);

    this.solutionItems.push(solution);

  }

  addSolutionCombination() {
    console.log("addSolutionCombination()");

    //let combination = this.combinationMap.values().next().value;
    let new_comb = new SolutionTerm;
    new_comb.destination = 1;
    new_comb.logicType = LogicType.And;
    new_comb.requiredItems = [];

    for (var i = 0; i < this.combinationMap.values().next().value.requiredItems.length; i++) {
      new_comb.requiredItems.push(true);
    }

    this.combinationMap.push(new_comb);
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
      this.solutionItems = this.gameElement.requirementCombination.solutionItems;
      this.combinationMap = this.gameElement.requirementCombination.combinationMap;
      this.maxTries = this.gameElement.maxTries;
      this.questType = this.gameElement.questType;
      switch (this.questType) {
        case QuestType.Text:
          this.quest_type_status_int = 1;
          break;
        case QuestType.MultipleChoice:
          this.quest_type_status_int = 2;
          break;
      }
    }
    else if ((this.gameElement instanceof Narrative)) {
      this.narrative_status = this.gameElement.narrativeStatus;
      if (this.narrative_status == NarrativeStatus.Continue) {
        this.selected_narrative_status_int = 1;
      } else if (this.narrative_status == NarrativeStatus.Win) {
        this.selected_narrative_status_int = 2;
      } else {
        this.selected_narrative_status_int = 3;
      }

      this.narrative_type = this.gameElement.narrativeType;
      if (this.narrative_type == NarrativeType.Panorama) {
        this.selected_narrative_type_int = 2;
      }
      else {
        this.selected_narrative_type_int = 1;
      }

      console.log("loaded narrative status as: ", this.narrative_status);
      this.buttons = this.gameElement.buttons;
      console.log("Number of Buttons: ", this.buttons.length);
    }
  }

  localToGameElement(): void {
    this.gameElement.title = this.title;
    this.gameElement.description.text = this.description;
    this.gameElement.description.image = this.image_url;

    if ((this.gameElement instanceof Quest)) {
    } else if ((this.gameElement instanceof Narrative)) {
      this.gameElement.narrativeStatus = this.narrative_status;
      this.gameElement.buttons = this.buttons;
    }
  }

  setChase(chase: Chase): void {
    this.chase = chase;

    //create gameelementsmap (id -> string)
    // also create simple array used to generate dropdown values
    this.gameElementsMap = new Map<number, string>();
    this.gameElementsList = [];

    this.chase.gameElements.forEach((value: GameElement, key: number) => {
      let title_with_id = value.title + ' (' + key + ')'
      console.log("Key", key, "GameElement" + title_with_id);
      this.gameElementsMap.set(key, title_with_id);
      this.gameElementsList.push(title_with_id);
    });

    console.log("GameElementsList length:", this.gameElementsList.length);
    this.gameElementsList.forEach(function (value) {
      console.log(value);
    });

  }

  setGameElementToEdit(gm: GameElement): void {
    this.gameElement = gm;

    if ((gm instanceof Quest)) {
      console.log("Loading Quest in Editor");
      this.is_quest = true;
      this.is_narrative = false;
    } else if ((gm instanceof Narrative)) {
      console.log("Loading Narrative in Editor");
      this.is_quest = false;
      this.is_narrative = true;
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


