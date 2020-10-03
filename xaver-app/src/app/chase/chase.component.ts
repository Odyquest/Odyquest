import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { QuestService } from '../services/quest.service';

import { GameEngine } from '../control/gameEngine';
import { GameElement } from '../model/gameElement';
import { Description } from '../model/description';
import { Narrative } from '../model/narrative';
import { Quest } from '../model/quest';
import { Solution } from '../model/solution';

@Component({
  selector: 'app-chase',
  templateUrl: './chase.component.html',
  styleUrls: ['./chase.component.scss']
})
export class ChaseComponent implements OnInit {
  game: GameEngine;
  displayElement: GameElement;

  constructor(private activatedRoute: ActivatedRoute, public questService: QuestService) {
    // FIXME console.log('data?', this.activatedRoute.snapshot.data.chase);
    // FIXME this.chase = this.activatedRoute.snapshot.data.chase;
    this.game = new GameEngine();
    this.displayElement = this.game.get_next_element('null');
  }

  ngOnInit(): void {

    // this.chase.quests.forEach(quest =>


    //   // console.log('quest: ', this.questService.getQuestById(Object.keys(quest)[0]))

    // );
    // console.log('quest: ', this.questService.getQuestById("00000000-0000-0000-0000-000000000004").subscribe(quest => (console.log('lol?', quest))))

  }

  getNextQuest(quest): void {
    Object.keys(quest)
    // this.questService.getQuestById()

    //this.chase = new Chase();
    //this.chase.title = 'demo chase';
    //this.displayElement = this.chase.get_next('null');
    // const element = new Description();
    // element.title = 'example';
    // this.displayElement = element;

  }

  ngOnLoad(): void {
    // load current chase/description
  }

  onSelection(button: string): void {
    this.displayElement = this.game.get_next_element(button);
  }

  ngOnNext(): void {
    // which element is next?
    this.displayElement = this.game.get_next_element('null');
  }

  isNarrative(element: GameElement): boolean {
    return element instanceof Narrative;
  }

  isQuest(element: GameElement): boolean {
    return element instanceof Quest;
  }

  isSolution(element: GameElement): boolean {
    return element instanceof Solution;
  }

}
