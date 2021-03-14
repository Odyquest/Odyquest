import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Chase } from 'src/app/shared/models/chase';
import { Quest } from 'src/app/shared/models/quest';
import { Narrative } from 'src/app/shared/models/narrative';
import { GameElement } from 'src/app/shared/models/gameElement';
import { ChaseService } from 'src/app/shared/services/chase.service';
import { deserialize, serialize } from 'typescript-json-serializer';
import { SELECT_PANEL_INDENT_PADDING_X } from '@angular/material/select';
import { Description } from 'src/app/shared/models/description';

@Component({
  selector: 'main-chase-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.scss']
})

export class MainEditorComponent implements OnInit, AfterViewInit {

  public chase: Chase;
  selectedQuest: number;
  chaseID = "julia"; //{"xaver", "julia", "silke"}

  @ViewChild('quest_editor') questEditor;

  // these values are filled with info from the chase
  // todo use actual questList
  questList: string[];
  narrativeList: string[];

  // reads all the info from this.chase and writes onto class members
  getDataFromChase(): void {
    this.selectedQuest = 3;//todo change again

    //console.log("Selected Quest Id: " + this.selectedQuest);
    //console.log("Loading values from Chase", this.chase.metaData.title);

    //write questList string
    console.log("Contained GameElements (" + this.chase.gameElements.size + "):");
    this.questList = [];
    this.narrativeList = [];

    this.chase.gameElements.forEach((value: GameElement, key: Number) => {
      let title_with_id = value.title + ' (' + key + ')' 
      if((value instanceof Quest)){
        console.log("Quest:" + title_with_id);
        this.questList.push(title_with_id);
      } else if ((value instanceof Narrative)){
        console.log("Narrative:" + title_with_id);
        this.narrativeList.push(title_with_id);
      }
    });
  }

  // forwards the selected quest to the QuestEditorComponent
  selectQuestByNumber(itemID: number): void {

  }

  constructor(private chaseService: ChaseService) { }

  ngOnInit(): void {
    console.log("ngOnInit()");
    //this.chaseService.getChase(this.chaseID).subscribe(chase => (this.start_game(deserialize<Chase>(chase, Chase))));
    this.chaseService.getChase(this.chaseID).subscribe(chase => {
      this.chase = deserialize<Chase>(chase, Chase)
      this.getDataFromChase();
      this.questEditor.setGameElementToEdit(this.chase.gameElements.get(this.selectedQuest));
      this.questEditor.setChase(this.chase);
    });

  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit()");
  }

  // selectQuestByName(value: String) {
  //   console.log(value)
  // }

  static parseIdFromGEString(text: string) : number {
    let id_text = text.substr(text.lastIndexOf( "(" ) + 1); //)
    id_text = id_text.substr(0, id_text.length - 1);

    return +id_text;
  }

  questSelectorClicked(text: string) {
    console.log("Quest Selector Clicked", text);

    //parse id from name, not so pretty a solution TBH
    this.selectedQuest = MainEditorComponent.parseIdFromGEString(text);
    this.questEditor.setGameElementToEdit(this.chase.gameElements.get(this.selectedQuest));
    this.questEditor.setChase(this.chase);
  }

  deleteGameElement(text: string) {
    let delete_index = MainEditorComponent.parseIdFromGEString(text);
    this.chase.gameElements.delete(delete_index);
    console.log("deleted GameElement:", text);

    //todo reload component?
    this.getDataFromChase();
  }

  addQuest() {
    console.log("addQuest()");

    const quest = new Quest();
    quest.title = 'New Quest';
    this.chase.gameElements.set(this.getNextFreeMapKey(), quest);

    this.getDataFromChase();
  }

  addNarrative() {
    console.log("addNarrative()");

    const narrative = new Narrative();
    narrative.title = 'New Narrative';
    this.chase.gameElements.set(this.getNextFreeMapKey(), narrative);

    this.getDataFromChase();
  }

  getNextFreeMapKey(): number {
    let key = 1;

    while (true) {
      if (!this.chase.gameElements.has(key)) {
        console.log("Found next free key: ", key);
        return key;
      }
      key++;
    }
  }

  pushChaseToServer(): void {
    console.log("Push chase to server!", serialize(this.chase, true));

    this.chaseService.createChase(this.chase);
  }

}
