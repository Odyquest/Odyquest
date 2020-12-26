import { UiService } from './../../../core/services/ui.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { deserialize, serialize } from 'typescript-json-serializer';

import { ChaseService } from 'src/app/shared/services/chase.service';
import { ChaseStorageService } from 'src/app/core/services/chaseStorage.service';
import { GameService, QuestStatus } from '../../../core/services/game.service';
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
  game: GameService;
  displayElement: GameElement;

  constructor(private activatedRoute: ActivatedRoute,
              public chaseService: ChaseService,
              private uiService: UiService,
              private chaseStorage: ChaseStorageService) {
    this.chaseID = this.activatedRoute.snapshot.queryParams.id;
    // TODO if no id, but local/file/...
    console.log('start chase with id', this.chaseID);
    this.game = new GameService(this.chaseStorage, getSimpleExample());
    this.displayElement = this.game.start();
    this.uiService.toolbarTitle.next('Beispiel Schnitzeljagd');
  }

  start_game(chase: Chase): void {
    console.log('start new game: ' + chase.metaData.title);
    this.game = new GameService(this.chaseStorage, chase);
    // TODO save to local storage
    // TODO if position is set...
    this.displayElement = this.game.start();
    this.uiService.toolbarTitle.next(this.game.chase.metaData.title);
  }

  ngOnInit(): void {
    this.chaseService.getChase(this.chaseID).subscribe(chase => (this.start_game(deserialize<Chase>(chase, Chase))));
  }

  selectDestination(destination: number): void {
    this.displayElement = this.game.continueWith(destination);
    console.log('Select next element "' + this.displayElement.title + '" (' + destination + ')');

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
