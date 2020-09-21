import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { QuestService } from '../services/quest.service';

import { Chase, ChaseElement, Description, Quest, Solution } from '../chase';

@Component({
  selector: 'app-chase',
  templateUrl: './chase.component.html',
  styleUrls: ['./chase.component.scss']
})
export class ChaseComponent implements OnInit {
  chase: Chase;
  displayElement: ChaseElement;

  constructor(private activatedRoute: ActivatedRoute, public questService: QuestService) {
    console.log('data?', this.activatedRoute.snapshot.data.chase);
    this.chase = this.activatedRoute.snapshot.data.chase;
  }

  ngOnInit(): void {

    // this.chase.quests.forEach(quest =>


    //   // console.log('quest: ', this.questService.getQuestById(Object.keys(quest)[0]))

    // );
    // console.log('quest: ', this.questService.getQuestById("00000000-0000-0000-0000-000000000004").subscribe(quest => (console.log('lol?', quest))))

  }

  getNextQuest(quest) {
    Object.keys(quest)
    // this.questService.getQuestById()

    this.chase = new Chase();
    this.chase.title = 'demo chase';
    this.displayElement = this.chase.get_next('null');
    // const element = new Description();
    // element.title = 'example';
    // this.displayElement = element;

  }

  ngOnLoad(): void {
    // load current chase/description
  }

  onSelection(button: string): void {
    this.displayElement = this.chase.get_next(button);
  }

  ngOnNext(): void {
    // which element is next?
    this.displayElement = this.chase.get_next('null');
  }

  isDescription(element: ChaseElement): boolean {
    return element instanceof Description;
  }

  isQuest(element: ChaseElement): boolean {
    return element instanceof Quest;
  }

  isSolution(element: ChaseElement): boolean {
    return element instanceof Solution;
  }

}
