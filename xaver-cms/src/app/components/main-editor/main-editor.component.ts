import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
//import { ChaseService } from 'src/app/services/chase.service';
//import { QuestEditorComponent} from './quest-editor/quest-editor.component';
///home/frot/XaverImMuseum/xaver-app/src/app/shared/models/example/chaseExample.ts
//import { getSimpleExample } from '../../../../../xaver-app/src/app/shared/models/example/chaseExample'
import { Chase } from '../../../../../xaver-app/src/app/shared/models/chase';
import { Quest } from '../../../../../xaver-app/src/app/shared/models/quest';
import { GameElement } from '../../../../../xaver-app/src/app/shared/models/gameElement';
import { ChaseService } from '../../../../../xaver-app/src/app/core/services/chase.service'
import { deserialize, serialize } from 'typescript-json-serializer';
import { Inject } from '@angular/core'

@Component({
  selector: 'main-chase-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.scss']
})

export class MainEditorComponent implements OnInit, AfterViewInit {

  public chase: Chase;
  selectedQuest: number;
  chaseID = "xaver"; //{"xaver", "julia", "silke"}

  @ViewChild('quest_editor') questEditor;

  // these values are filled with info from the chase
  // todo use actual questList
  questList: string[];

  // reads all the info from this.chase and writes onto class members
  getDataFromChase(): void {
    this.selectedQuest = 1;
    console.log("Selected Quest Id: " + this.selectedQuest);

    console.log("Loading values from Chase", this.chase.metaData.title);

    //write questList string
    console.log("Contained GameElements (" + this.chase.gameElements.size + "):");
    this.questList = [];
    this.chase.gameElements.forEach((value: GameElement, key: Number) => {
      console.log("   " + value.title);
      this.questList.push(value.title);
    });
  }

  // forwards the selected quest to the QuestEditorComponent
  selectQuestByNumber(itemID: number): void {

  }

  constructor(private chaseService: ChaseService) { }

  ngOnInit(): void {


    //this.chase = this.chaseService.getChase("example"); //"example", "julia", "pepper", "silke"
    //this.chase = getSimpleExample();

    this.chaseService.getChase(this.chaseID).subscribe(chase_to_get => (this.chase = (deserialize<Chase>(chase_to_get, Chase))));
    //this.chaseService.getChase(this.chaseID).subscribe(chase => (this.start_game(deserialize<Chase>(chase, Chase))));


    this.getDataFromChase();

    this.chaseService.chases.subscribe(chases => {
      //this.chases = chases;
      //console.log('CHASES: ', this.chases);
    })
  }

  ngAfterViewInit(): void {
    this.questEditor.setGameElementToEdit(this.chase.gameElements.get(this.selectedQuest));
  }

  selectQuestByName(value: String) {
    console.log(value)
  }

  questSelectorClicked(event, value) {
    console.log("Quest Selector Clicked", event.value);
  }

  addQuest() {
    console.log("addQuest()");

    const quest = new Quest();
    quest.title = 'New Quest';
    this.chase.gameElements.set(this.getNextFreeMapKey(), quest);

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

}
