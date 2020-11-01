import { Component, OnInit } from '@angular/core';
import { ChaseService } from 'src/app/services/chase.service';
//import { QuestEditorComponent} from './quest-editor/quest-editor.component';
///home/frot/XaverImMuseum/xaver-app/src/app/shared/models/example/chaseExample.ts
import {getExample} from '../../../../../xaver-app/src/app/shared/models/example/chaseExample'
import { Chase } from '../../../../../xaver-app/src/app/shared/models/chase';

@Component({
  selector: 'main-chase-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.scss']
})

export class MainEditorComponent implements OnInit {


  public chase : Chase;
  //public chases;
  questList: string[] = ['Quest1', 'Quest2', 'Quest3', 'Quest4', 'Quest56'];

  constructor(private chaseService: ChaseService) { }

  ngOnInit(): void {

    this.chase = getExample();

    console.log(this.chase);

    this.chaseService.chases.subscribe(chases => {
      //this.chases = chases;
      //console.log('CHASES: ', this.chases);
    })
  }

  selectQuest(value: String) {
    console.log(value)
  }


}
