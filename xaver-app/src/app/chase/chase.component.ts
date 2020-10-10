import { UiService } from './../services/ui.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { QuestService } from '../services/quest.service';

import { GameEngine, QuestStatus } from '../control/gameEngine';
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

  constructor(private activatedRoute: ActivatedRoute, public questService: QuestService, private uiService: UiService) {
    // FIXME console.log('data?', this.activatedRoute.snapshot.data.chase);
    // FIXME this.chase = this.activatedRoute.snapshot.data.chase;
    this.game = new GameEngine();
    this.displayElement = this.game.get_next_element('null');
    this.uiService.toolbarTitle.next("Beispiel Schnitzeljagd");
  }

  ngOnInit(): void {

    // this.chase.quests.forEach(quest =>
    //   // console.log('quest: ', this.questService.getQuestById(Object.keys(quest)[0]))
    // );
    // console.log('quest: ', this.questService.getQuestById("00000000-0000-0000-0000-000000000004").subscribe(quest => (console.log('lol?', quest))))

  }

  ngOnLoad(): void {
    // load current chase/description
  }

  selectDestination(destination: number): void {
    this.displayElement = this.game.chase.getElement(destination);
    console.log('Select next element "' + this.displayElement.title + '" (' + destination + ')');

    if (this.displayElement instanceof Quest) {
      const quest = this.displayElement as Quest;
      this.game.startQuest(quest);
    }
  }

  selectSolution(solution: number): void {
    const currentQuest = this.displayElement as Quest;
    this.displayElement = currentQuest.getElement(solution);
    console.log('Select solution "' + this.displayElement.title + '" (' + solution + ')');
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
