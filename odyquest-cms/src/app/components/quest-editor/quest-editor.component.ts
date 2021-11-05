import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { GameElement } from 'chase-model';
import { Quest, QuestType } from 'chase-model';
import {
  Narrative,
  NarrativeType,
  NarrativeStatus,
} from 'chase-model';
import { XButton } from 'chase-model';
import { Chase } from 'chase-model';
import { LogicType, SolutionTerm } from 'chase-model';
import { CombineLatestSubscriber } from 'rxjs/internal/observable/combineLatest';
import { Description } from 'chase-model';
import { MainEditorComponent } from '../main-editor/main-editor.component';
import { ChaseService } from 'chase-services';

@Component({
  selector: 'app-quest-editor',
  templateUrl: './quest-editor.component.html',
  styleUrls: ['./quest-editor.component.scss'],
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
  combinationMap: Array<SolutionTerm>;
  maxTries: number;
  maxTime: number;
  public quest_type_status_int; //"Text" = 1, "MultipleChoice" = 2
  questType: QuestType;
  display_image_first: boolean;
  solution_type_status_int: Array<number>;
  solution_destination_description: Array<string>;

  //Narrative
  narrative_status: NarrativeStatus;
  public selected_narrative_status_int = 1; //"Continue" = 1, "Win" = 2, "Loose" = 3
  narrative_type: NarrativeType;
  public selected_narrative_type_int = 1; //"Text" = 1, "Panorama" = 2

  buttons: Array<XButton>;
  buttonDestinationList: Array<string>;
  gameElementsMap: Map<number, string>;
  gameElementsList: string[];
  help: Array<Description>;

  initial_setup = true;

  constructor(
    @Inject(MainEditorComponent) public main_editor: MainEditorComponent,
    private cd: ChangeDetectorRef,
    private chaseService: ChaseService
  ) {}

  ngOnInit(): void {}

  onQuestTypeChange(value: String) {
    console.log('Changed quest type to ' + value);
    switch (value) {
      case '1':
        this.questType = QuestType.Text;
        break;
      case '2':
        this.questType = QuestType.MultipleChoice;
        break;
    }
  }

  onSolutionTypeStatusChange(value: String, index: number) {
    console.log('Changed solution type on index ' + index + ' to ' + value);
    switch (value) {
      case '1':
        this.questType = QuestType.Text;
        break;
      case '2':
        this.questType = QuestType.MultipleChoice;
        break;
    }
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

  onNarrativeTypeChange(value: number) {
    console.log('Narrative type to ' + value);
    switch (value) {
      case 1: // "Text"
        this.narrative_type = NarrativeType.Text;
        console.log(this.selected_narrative_type_int);
        break;
      case 2: // "Panorama"
        this.narrative_type = NarrativeType.Panorama;
        console.log(this.selected_narrative_type_int);
        break;
    }
  }

  parseIdFromGEString(text: string): number {
    let id_text = text.substr(text.lastIndexOf('(') + 1); //)
    id_text = id_text.substr(0, id_text.length - 1);

    return +id_text;
  }

  onNarrativeButtonDestinationChange(index: number, value: string) {
    this.buttons[index].destination = this.parseIdFromGEString(value);
    this.buttonDestinationList[index] = value;
    console.log(
      'Set Destination of buttons[' +
        index +
        '], to ' +
        this.buttons[index].destination
    );
  }

  onCombinationMapDestinationChange(index: number, value: string) {
    this.combinationMap[index].destination = this.parseIdFromGEString(value);
    console.log(
      'Set Destination of CombinationMap[' +
        index +
        '], to ' +
        this.combinationMap[index].destination
    );
  }

  deleteNarrativeButton(index: number) {
    console.log('deleteNarrativeButton(' + index + ')');

    this.buttons.splice(index, 1);
    this.buttonDestinationList.splice(index, 1);
  }

  deleteHelpText(index: number) {
    console.log('deleteHelpText(' + index + ')');

    this.help.splice(index, 1);
  }

  onTitleChange(): void {
    console.log('title changed!');

    //save data so the MainCOmponent can access it, then recreate the quest list
    this.localToGameElement();
    this.main_editor.loadDataFromChase();
  }

  deleteQuestSolution(index: number) {
    console.log('deleteQuestSolution(' + index + ')');

    this.solutionItems.splice(index, 1);
    for (var cm of this.combinationMap) {
      cm.requiredItems.splice(index, 1);
    }

    //todo need to update various other stuff
  }

  deleteSolutionCombination(index: number) {
    console.log('deleteSolutionCombination(' + index + ')');

    this.combinationMap.splice(index, 1);
    this.solution_type_status_int.splice(index, 1);
    //this.solution_destination_description.splice(index, 1);
  }

  updateSolutionItem(event, index) {
    this.solutionItems[index] = event.target.value;
  }

  addButton() {
    console.log('addButton()');
    console.log(this.buttons.length);

    let button = new XButton();
    button.name = 'Weiter';
    //just use some id which is actually existing
    button.destination = this.parseIdFromGEString(
      this.gameElementsList[0]
    );

    this.buttons.push(button);
    this.buttonDestinationList[this.gameElementsList[0]];

    console.log(this.buttons.length);
  }

  addHelpText() {
    console.log('addHelpText()', this.help);
    console.log(this.help.length);

    let help_text = new Description();
    help_text.text = 'HilfeText';
    this.help.push(help_text);

    console.log(this.help.length);
  }

  addSolutionItem() {
    console.log('addSolutionItem()');

    let solution = 'Neue Lösung';

    //todo need to update various other stuff
    for (var comb = 0; comb < this.combinationMap.length; comb++) {
      this.combinationMap[comb].requiredItems.push(true);
    }

    //just use some id which is actually existing
    //button.destination = this.parseIdFromGEString(this.gameElementsMap.values().next().value);

    this.solutionItems.push(solution);
  }

  addSolutionCombination() {
    console.log('addSolutionCombination()');

    //let combination = this.combinationMap.values().next().value;
    let new_comb = new SolutionTerm();
    new_comb.destination = 1;
    new_comb.logicType = LogicType.And;
    new_comb.requiredItems = [];

    for (
      var i = 0;
      i < this.combinationMap.values().next().value.requiredItems.length;
      i++
    ) {
      new_comb.requiredItems.push(true);
    }

    this.combinationMap.push(new_comb);
    this.solution_type_status_int.push(1);
    this.solution_destination_description.push(this.gameElementsList[0]);
  }

  // hardly a sexy solution...
  // input forms can't read directly from GameElement?
  gameElementToLocal(): void {
    //common to all GameElements
    this.title = this.gameElement.title;
    this.description = this.gameElement.description.text;
    this.image_url = this.gameElement.description.image;
    this.help = this.gameElement.help;
    if (this.help === undefined) {
      this.help = [];
    }

    //Individual stuff
    if (this.gameElement instanceof Quest) {
      this.solutionItems =
        this.gameElement.requirementCombination.solutionItems;
      this.combinationMap =
        this.gameElement.requirementCombination.combinationMap;
      this.maxTries = this.gameElement.maxTries;
      this.questType = this.gameElement.questType;

      this.display_image_first = this.gameElement.displayImageFirst;

      if (this.gameElement.maxTime !== undefined) {
        this.maxTime = this.gameElement.maxTime.getTime() / 1000;
      } else {
        this.maxTime = 0;
      }

      switch (this.questType) {
        case QuestType.Text:
          this.quest_type_status_int = 1;
          break;
        case QuestType.MultipleChoice:
          this.quest_type_status_int = 2;
          break;
      }

      this.solution_type_status_int = [];
      this.solution_destination_description = new Array<string>();
      var counter = 0;
      for (var cm of this.gameElement.requirementCombination.combinationMap) {
        this.solution_destination_description.push(this.gameElementsMap.get(cm.destination));
        if (cm.logicType == LogicType.And) {
          this.solution_type_status_int[counter] = 1;
        } else {
          this.solution_type_status_int[counter] = 2;
        }
        counter++;
      }
    } else if (this.gameElement instanceof Narrative) {
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
      } else {
        this.selected_narrative_type_int = 1;
      }

      console.log('loaded narrative status as: ', this.narrative_status);
      this.buttons = this.gameElement.buttons;
      this.buttonDestinationList = new Array<string>();
      for (const button of this.buttons) {
        this.buttonDestinationList.push(this.gameElementsMap.get(button.destination));
      }
      console.log('Number of Buttons: ', this.buttons.length);
    }
  }

  localToGameElement(): void {
    //common to all GameElements
    this.gameElement.title = this.title;
    console.log(this.gameElement.title);
    this.gameElement.description.text = this.description;
    this.gameElement.description.image = this.image_url;
    this.gameElement.help = this.help;

    //Individual stuff
    if (this.gameElement instanceof Quest) {
      this.gameElement.requirementCombination.solutionItems =
        this.solutionItems;
      this.gameElement.requirementCombination.combinationMap =
        this.combinationMap;
      this.gameElement.maxTries = this.maxTries;
      this.gameElement.questType = this.questType;

      this.gameElement.displayImageFirst = this.display_image_first;

      var counter = 0;
      for (var cm of this.gameElement.requirementCombination.combinationMap) {
        cm.destination = this.parseIdFromGEString(this.solution_destination_description[counter]);
        if (this.solution_type_status_int[counter] == 1) {
          cm.logicType = LogicType.And;
        } else {
          cm.logicType = LogicType.Or;
        }
        counter++;
      }
      //why use date?
      var t = new Date(0); // Epoch
      t.setSeconds(this.maxTime);
      this.gameElement.maxTime = t;

      if (this.quest_type_status_int == 1) {
        this.gameElement.questType = QuestType.Text;
      } else {
        this.gameElement.questType = QuestType.MultipleChoice;
      }
    } else if (this.gameElement instanceof Narrative) {
      this.gameElement.narrativeStatus = this.narrative_status;
      this.gameElement.narrativeType = this.narrative_type;
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
      let title_with_id = value.title + ' (' + key + ')';
      console.log('Key', key, 'GameElement' + title_with_id);
      this.gameElementsMap.set(key, title_with_id);
      this.gameElementsList.push(title_with_id);
    });

    console.log('GameElementsList length:', this.gameElementsList.length);
    this.gameElementsList.forEach(function (value) {
      console.log(value);
    });
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
      this.is_quest = true;
      this.is_narrative = false;
    } else if (gm instanceof Narrative) {
      console.log('Loading Narrative in Editor');
      this.is_quest = false;
      this.is_narrative = true;
    }
    console.log('Title: ' + this.gameElement.title);

    this.gameElementToLocal();

    //we need to manually tell angular that changes occured:
    this.cd.detectChanges();
  }

  getElementFromMap(index: number): string {
    return this.gameElementsMap.get(index);
  }

  save(): void {
    console.log('save');
    this.localToGameElement();
    // todo it seems TypeScript only uses references anyways... so the values are actually the same on GameElement and this
    // -> already written
  }

  reset(): void {
    console.log('reset');
    this.gameElementToLocal();
    // -> reset values get
  }

  getChaseId(): string {
    if (this.chase && this.chase.metaData.chaseId) {
      return this.chase.metaData.chaseId;
    }
  }

  updateImageUrl(url: string): void {
    this.image_url = url;
  }

  updateHelpImageUrl(helpId: number, url: string): void {
    this.help[helpId].image = url;
  }

}
