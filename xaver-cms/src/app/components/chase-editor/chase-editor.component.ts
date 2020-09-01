import { Component, OnInit } from '@angular/core';
import { ChaseService } from 'src/app/services/chase.service';

@Component({
  selector: 'app-chase-editor',
  templateUrl: './chase-editor.component.html',
  styleUrls: ['./chase-editor.component.scss']
})
export class ChaseEditorComponent implements OnInit {

  public chases;

  constructor(private chaseService: ChaseService) { }

  ngOnInit(): void {



    this.chaseService.chases.subscribe(chases => {
      this.chases = chases;
      console.log('CHASES: ', this.chases);
    })
  }

  getQuests() {
    this.chaseService.getAllChases().subscribe(chases => this.chaseService.chases.next(chases))
  }
}
