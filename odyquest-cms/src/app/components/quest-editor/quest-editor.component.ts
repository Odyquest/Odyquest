import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { CombineLatestSubscriber } from 'rxjs/internal/observable/combineLatest';

import { GameElement } from 'chase-model';
import { Quest, QuestType } from 'chase-model';
import { Image } from 'chase-model';
import { Media } from 'chase-model';
import { Chase } from 'chase-model';
import { LogicType, SolutionTerm } from 'chase-model';
import { Description } from 'chase-model';

import { ChaseEditorService } from 'src/app/services/chase-editor.service';

@Component({
  selector: 'app-quest-editor',
  templateUrl: './quest-editor.component.html',
  styleUrls: ['./quest-editor.component.scss'],
})
export class QuestEditorComponent implements OnInit {
  gameElement: Quest = new Quest();

  solutionItems: Array<string>;
  combinationMap: Array<SolutionTerm>;
  maxTime: number;
  solution_type_status_int: Array<number>;
  solution_destination_description: Array<string>;

  initialSetup = true;

  constructor(
    private cd: ChangeDetectorRef,
    public chaseEditor: ChaseEditorService
  ) {}

  ngOnInit(): void {}

  getQuestType(value: string): QuestType {
    switch (value) {
      case QuestType.Text:
        return QuestType.Text;
      case QuestType.MultipleChoice:
        return QuestType.MultipleChoice;
    }
  }

  onCombinationMapDestinationChange(index: number, value: string) {
    this.combinationMap[index].destination = this.chaseEditor.getElementIdByName(value);
  }

  deleteQuestSolution(index: number) {
    console.log('deleteQuestSolution(' + index + ')');
    this.solutionItems.splice(index, 1);
    for (const cm of this.combinationMap) {
      cm.requiredItems.splice(index, 1);
    }

    // todo need to update various other stuff
  }

  deleteSolutionCombination(index: number) {
    console.log('deleteSolutionCombination(' + index + ')');

    this.combinationMap.splice(index, 1);
    this.solution_type_status_int.splice(index, 1);
    // this.solution_destination_description.splice(index, 1);
  }

  updateSolutionItem(event, index) {
    this.solutionItems[index] = event.target.value;
  }

  addSolutionItem() {
    console.log('addSolutionItem()');

    const solution = 'Neue Lösung'; // FIXME localize

    // todo need to update various other stuff
    for (let comb = 0; comb < this.combinationMap.length; comb++) {
      this.combinationMap[comb].requiredItems.push(true);
    }
    this.solutionItems.push(solution);
  }

  addSolutionCombination() {
    console.log('addSolutionCombination()');

    // let combination = this.combinationMap.values().next().value;
    let new_comb = new SolutionTerm();
    new_comb.destination = 1;
    new_comb.logicType = LogicType.And;
    new_comb.requiredItems = [];

    for (
      let i = 0;
      i < this.combinationMap.values().next().value.requiredItems.length;
      i++
    ) {
      new_comb.requiredItems.push(true);
    }

    this.combinationMap.push(new_comb);
    this.solution_type_status_int.push(1);
    this.solution_destination_description.push(this.chaseEditor.getElementNames()[0]);
  }

  gameElementToLocal(): void {
    // Individual stuff
    if (this.gameElement instanceof Quest) {
      this.solutionItems =
        this.gameElement.requirementCombination.solutionItems;
      this.combinationMap =
        this.gameElement.requirementCombination.combinationMap;

      if (this.gameElement.maxTime !== undefined) {
        this.maxTime = this.gameElement.maxTime.getTime() / 1000;
      } else {
        this.maxTime = 0;
      }

      this.solution_type_status_int = [];
      this.solution_destination_description = new Array<string>();
      let counter = 0;
      for (const cm of this.gameElement.requirementCombination.combinationMap) {
        this.solution_destination_description.push(this.chaseEditor.getElementNameById(cm.destination));
        if (cm.logicType === LogicType.And) {
          this.solution_type_status_int[counter] = 1;
        } else {
          this.solution_type_status_int[counter] = 2;
        }
        counter++;
      }
    }
  }

  localToGameElement(): void {
    // Individual stuff
    if (this.gameElement instanceof Quest) {
      this.gameElement.requirementCombination.solutionItems =
        this.solutionItems;
      this.gameElement.requirementCombination.combinationMap =
        this.combinationMap;

      let counter = 0;
      for (const cm of this.gameElement.requirementCombination.combinationMap) {
        cm.destination = this.chaseEditor.getElementIdByName(this.solution_destination_description[counter]);
        if (this.solution_type_status_int[counter] === 1) {
          cm.logicType = LogicType.And;
        } else {
          cm.logicType = LogicType.Or;
        }
        counter++;
      }
      // why use date?
      const t = new Date(0); // Epoch
      t.setSeconds(this.maxTime);
      this.gameElement.maxTime = t;

    }
  }

  reloadChase(): void {
  }

  setGameElementToEdit(gm: Quest): void {
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

  save(): void {
    console.log('save');
    this.localToGameElement();
  }

  reset(): void {
    console.log('reset');
    this.gameElementToLocal();
    // -> reset values get
  }
}
