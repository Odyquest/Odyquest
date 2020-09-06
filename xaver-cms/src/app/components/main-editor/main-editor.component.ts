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

  constructor(private chaseService: ChaseService) { }

  ngOnInit(): void {



    this.chaseService.chases.subscribe(chases => {
      this.chases = chases;
      console.log('CHASES: ', this.chases);
    })
  }

  
}
