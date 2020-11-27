import { UiService } from './../../../core/services/ui.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ChaseService } from './../../../core/services/chase.service';
import { deserialize, serialize } from 'typescript-json-serializer';

import { GameEngine, QuestStatus } from '../../../core/services/gameEngine';
import { GameElement } from '../../../shared/models/gameElement';
import { Description } from '../../../shared/models/description';
import { Narrative } from '../../../shared/models/narrative';
import { Quest } from '../../../shared/models/quest';
import { Solution } from '../../../shared/models/solution';
import { Chase } from '../../../shared/models/chase';

import { getSimpleExample } from '../../../shared/models/example/chaseExample';

@Component({
  selector: 'app-chase',
  templateUrl: './chase.component.html',
  styleUrls: ['./chase.component.scss']
})
export class ChaseComponent implements OnInit {
  chaseID: string;
  game: GameEngine;
  displayElement: GameElement;

  constructor(private activatedRoute: ActivatedRoute, public chaseService: ChaseService, private uiService: UiService) {
    this.chaseID = this.activatedRoute.snapshot.queryParams.id;
    console.log('start chase with id', this.chaseID);
    this.game = new GameEngine(getSimpleExample());
    this.displayElement = this.game.get_initial_element();
    this.uiService.toolbarTitle.next("Beispiel Schnitzeljagd");
  }

  start_game(chase: Chase): void {
    console.log('start new game: ' + chase.metaData.title);
    this.game = new GameEngine(chase);
    this.displayElement = this.game.get_initial_element();
    this.uiService.toolbarTitle.next(this.game.title);
  }

  ngOnInit(): void {
    this.chaseService.getChase(this.chaseID).subscribe(chase => (this.start_game(deserialize<Chase>(chase, Chase))));
  }

  selectDestination(destination: number): void {
    this.displayElement = this.game.chase.getElement(destination);
    console.log('Select next element "' + this.displayElement.title + '" (' + destination + ')');

    if (this.displayElement instanceof Quest) {
      const quest = this.displayElement as Quest;
      this.game.startQuest(quest);
    }
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
