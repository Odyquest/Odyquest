import { Component, OnInit } from '@angular/core';
import { ChaseService } from 'src/app/services/chase.service';
//import { QuestEditorComponent} from './quest-editor/quest-editor.component';
///home/frot/XaverImMuseum/xaver-app/src/app/shared/models/example/chaseExample.ts
import { getExample } from '../../../../../xaver-app/src/app/shared/models/example/chaseExample'
import { Chase } from '../../../../../xaver-app/src/app/shared/models/chase';
import { GameElement } from '../../../../../xaver-app/src/app/shared/models/gameElement';

@Component({
  selector: 'main-chase-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.scss']
})

export class MainEditorComponent implements OnInit {

  // the chase
  public chase: Chase;

  // these values are filled with info from the chase
  questList: string[] = ['Quest1', 'Quest2', 'Quest3', 'Quest4', 'Quest56'];

  // reads all the info from this.chase and writes onto class members
  getDataFromChase(): void {
    console.log("getDataFromChase()");

    //write questList string
    this.questList = [];
    console.log("Loading values from Chase", this.chase.title);
    console.log("Contained GameElements (" + this.chase.gameElements.size + "):");
    this.chase.gameElements.forEach((value: GameElement, key: Number) => {
      console.log("   " + value.title);
      this.questList.push(value.title);
    });

  }

  constructor(private chaseService: ChaseService) { }

  ngOnInit(): void {

    this.chase = getExample();

    this.getDataFromChase();

    //console.log(this.chase);

    this.chaseService.chases.subscribe(chases => {
      //this.chases = chases;
      //console.log('CHASES: ', this.chases);
    })
  }

  selectQuest(value: String) {
    console.log(value)
  }


}
