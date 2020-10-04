import { Component, OnInit } from '@angular/core';
import { ChaseService } from 'src/app/services/chase.service';
//import { QuestEditorComponent} from './quest-editor/quest-editor.component';

@Component({
  selector: 'main-chase-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.scss']
})
export class MainEditorComponent implements OnInit {

  public chases;
  questList: string[] = ['Quest1', 'Quest2', 'Quest3', 'Quest4', 'Quest5'];

  constructor(private chaseService: ChaseService) { }

  ngOnInit(): void {

    this.chaseService.chases.subscribe(chases => {
      this.chases = chases;
      console.log('CHASES: ', this.chases);
    })
  }

  selectQuest(value: String) {
    console.log(value)
  }


}
